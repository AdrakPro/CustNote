import prisma from '$lib/prisma/prisma.js';
import { auth } from '$lib/firebase/firebase-admin.js';
import { WEB_API_KEY } from '$lib/utils/constants.js';
import { createTokens } from '$lib/utils/tokenManager.js';

export async function POST(event) {
	const { email, password, username } = await event.request.json();
	const userRecord = await auth().createUser({
		email,
		password,
		displayName: username,
	});
	const { uid } = userRecord;

	await auth().setCustomUserClaims(uid, { early_access: true });

	const signInRes = await fetch(
		`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`,
		{
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ email, password, returnSecureToken: true }),
		}
	);

	if (!signInRes.ok) {
		return new Response(undefined, { status: signInRes.status });
	}

	const { refreshToken } = await signInRes.json();
	const customToken = await auth().createCustomToken(uid);
	const headers = createTokens(refreshToken, customToken);

	// Create user in database
	await prisma.user.create({
		data: {
			id: uid,
		},
	});

	return new Response(undefined, { headers, status: 200 });
}
