import { auth } from '$lib/db/firebase-admin.js';
import { SECURE, WEB_API_KEY } from '$lib/utils/constants.js';

export async function POST(event) {
	const { email, password, username } = await event.request.json();
	const userRecord = await auth().createUser({
		email,
		password,
		displayName: username,
	});
	const { uid } = userRecord;

	await auth().setCustomUserClaims(uid, { early_access: true });

	const signIn_res = await fetch(
		`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ WEB_API_KEY }`,
		{
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ email, password, returnSecureToken: true }),
		}
	);

	if (!signIn_res.ok) {
		return { status: signIn_res.status };
	}

	const { refreshToken } = await signIn_res.json();
	const customToken = await auth().createCustomToken(uid);

	return {
		status: 200,
		headers: {
			'set-cookie': [
				`customToken=${ customToken }; Max-Age=${
					60 * 55
				}; Path=/;${ SECURE } HttpOnly`,
				`refreshToken=${ refreshToken }; Max-Age=${
					60 * 60 * 24 * 30
				}; Path=/;${ SECURE } HttpOnly`,
			],
			'cache-control': 'no-store',
		},
	};
}
