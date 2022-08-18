import { json } from '@sveltejs/kit';
import { auth } from '$lib/db/firebase-admin.js';
import { WEB_API_KEY } from '$lib/utils/constants.js';
import { createCustomToken, createTokens, removeRefreshToken } from '$lib/utils/tokenManager.js';
import cookie from 'cookie';

export async function POST(event) {
	const { email, password } = await event.request.json();
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

	const { refreshToken, localId } = await signInRes.json();
	const customToken = await auth().createCustomToken(localId);
	const headers = createTokens(refreshToken, customToken);

	return new Response(undefined, { headers, status: 200 });
}

function unauthorized() {
	const headers = removeRefreshToken();

	return new Response(undefined, { headers, status: 401 });
}

export async function GET(event) {
	const getCookie = event.request.headers.get('cookie') || '';
	let { refreshToken, customToken } = cookie.parse(getCookie);

	if (!refreshToken) {
		return unauthorized();
	}

	let headers = {};
	let user = {};

	try {
		user = await auth().verifyIdToken(customToken);
	} catch (error) {
		const refreshRes = await fetch(`https://identitytoolkit.googleapis.com/v1/token?key=${ WEB_API_KEY }`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ grant_type: 'refresh_token', 'refresh_token': refreshToken }),
		});

		if (!refreshRes.ok) {
			return unauthorized();
		}

		const tokens = await refreshRes.json();
		const idToken = tokens['id_token'];

		if (tokens['refresh_token'] !== refreshToken) {
			return unauthorized();
		}

		try {
			user = await auth().verifyIdToken(idToken);
			customToken = await auth().createCustomToken(user.uid);
			headers = createCustomToken(customToken);
		} catch (error) {
			unauthorized();
		}
	}

	return json({ user, customToken }, { headers });
}
