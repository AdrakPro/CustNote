import { auth } from '$lib/db/firebase-admin.js';
import { SECURE, WEB_API_KEY } from '$lib/utils/constants.js';

export async function POST (event) {
	const { email, password, username } = await event.request.json();
	const userRecord = await auth().createUser({
		email,
		password,
		displayName: username,
	});
	const { uid } = userRecord;

	await auth().setCustomUserClaims(uid, { early_access: true });

	const signInRes = await fetch(
		`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ WEB_API_KEY }`,
		{
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ email, password, returnSecureToken: true }),
		},
	);

	if (!signInRes.ok) {
		return new Response(undefined, { status: signInRes.status });
	}

	const { refreshToken } = await signInRes.json();
	const customToken = await auth().createCustomToken(uid);
	const headers = new Headers();
	headers.append('set-cookie', `customToken=${ customToken }; Max-Age=${ 60 * 55 }; Path=/;${ SECURE } HttpOnly`);
	headers.append('set-cookie', `refreshToken=${ refreshToken }; Max-Age=${ 60 * 60 * 24 * 30 }; Path=/;${ SECURE } HttpOnly`);
	headers.set('cache-control', 'no-store');

	return new Response(undefined, { headers, status: 200 });
}
