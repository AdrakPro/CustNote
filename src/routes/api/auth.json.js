import { auth } from '$lib/db/firebase-admin.js';
import { SECURE, WEB_API_KEY } from '$lib/utils/constants.js';
import cookie from 'cookie';

export async function POST(event) {
	const { email, password } = await event.request.json();
	const signInRes = await fetch(
		`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ WEB_API_KEY }`,
		{
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ email, password, returnSecureToken: true }),
		}
	);

	if (!signInRes.ok) {
		return { status: signInRes.status };
	}

	const { refreshToken, localId } = await signInRes.json();
	const customToken = await auth().createCustomToken(localId);

	return {
		status: 200,
		headers: {
			'set-cookie': [
				`refreshToken=${ refreshToken }; Max-Age=${
					60 * 60 * 24 * 30
				}; Path=/;${ SECURE } HttpOnly`,
				`customToken=${ customToken }; Max-Age=${
					60 * 55
				}; Path=/;${ SECURE } HttpOnly`,
			],
			'cache-control': 'no-store',
		},
	};
}

function error401() {
	return {
		status: 401,
		headers: {
			'set-cookie': `refreshToken=; Max-Age=0; Path=/;${ SECURE } HttpOnly`,
			'cache-control': 'no-store',
		},
	};
}

export async function GET(event) {
	const getCookie = event.request.headers.get('cookie') || '';
	let { refreshToken, customToken } = cookie.parse(getCookie);

	if (!refreshToken) {
		return error401();
	}

	let headers = {};
	let user = {};

	try {
		user = await auth().verifyIdToken(customToken);
	} catch (error) {
		const refreshRes = await fetch(`https://identitytoolkit.googleapis.com/v1/token?key=${ WEB_API_KEY }`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ grant_type: 'refresh_token', 'refresh_token': refreshToken })
		});

		if (!refreshRes.ok) return error401();

		const tokens = await refreshRes.json();
		const idToken = tokens['id_token'];

		if (tokens['refresh_token'] !== refreshToken) return error401();

		try {
			user = await auth().verifyIdToken(idToken);
			customToken = await auth().createCustomToken(user.uid);
			headers = {
				'set-cookie': [
					`customToken=${ customToken }; Max-Age=${ 60 * 55 }; Path=/;${ SECURE } HttpOnly;`,
				],
				'cache-control': 'no-store'
			}
		} catch (error) {
			error401();
		}
	}

	return {
		status: 200,
		body: { user, customToken },
		headers,
	};
}
