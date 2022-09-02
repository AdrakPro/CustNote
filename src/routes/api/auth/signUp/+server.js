import { createDataInModel } from '$lib/prisma.js';
import { auth } from '$lib/firebase/firebase-admin.js';
import { USER, WEB_API_KEY } from '$lib/utils/constants.js';
import { tokensCookie } from '$lib/utils/tokenManager.js';
import { post } from '$lib/api.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { email, password, username } = await request.json();
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

	await createDataInModel(USER, { id: uid });

	return new Response(undefined, { headers, status: 200 });
}
