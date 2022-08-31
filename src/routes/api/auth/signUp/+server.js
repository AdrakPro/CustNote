import { error } from '@sveltejs/kit';
import prisma from '$lib/../../../../lib/prisma';
import { auth } from '$lib/firebase/firebase-admin.js';
import { WEB_API_KEY } from '$lib/utils/constants.js';
import { tokensCookie } from '$lib/utils/tokenManager.js';
import { post } from '$lib/api.js';

export async function POST(event) {
	const { email, password, username } = await event.request.json();
	const userRecord = await auth().createUser({
		email,
		password,
		displayName: username,
	});
	const { uid } = userRecord;

	await auth().setCustomUserClaims(uid, { early_access: true });

	const signInRes = await post(
		`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`,
		{ email, password, returnSecureToken: true },
		null
	);

	if (!signInRes.ok) {
		return new Response(undefined, { status: signInRes.status });
	}

	const { refreshToken } = await signInRes.json();
	const customToken = await auth().createCustomToken(uid);
	const headers = tokensCookie(refreshToken, customToken);

	// Create user in database
	try {
		await prisma.user.create({
			data: {
				id: uid,
			},
		});
	} catch (e) {
		throw new error(400, e.message);
	}

	return new Response(undefined, { headers, status: 200 });
}
