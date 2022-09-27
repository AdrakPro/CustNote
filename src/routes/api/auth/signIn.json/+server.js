import { auth } from '$lib/firebase/firebase-admin.js';
import { WEB_API_KEY } from '$lib/utils/constants.js';
import { customTokenCookie, resetRefreshToken, tokensCookie } from '$lib/utils/tokenManager.js';
import { post } from '$lib/api.js';
import { json } from '@sveltejs/kit';
import cookie from 'cookie';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { email, password } = await request.json();
	const userRes = await post(
		`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ WEB_API_KEY }`,
		{ email, password, returnSecureToken: true },
	);

	if (!userRes.ok) {
		return new Response(undefined, { status: userRes.status });
	}

	const { refreshToken, localId } = await userRes.json();
	const customToken = await auth().createCustomToken(localId);
	const headers = tokensCookie(refreshToken, customToken);

	return new Response(undefined, { headers, status: 200 });
}

function unauthorized() {
	const headers = resetRefreshToken();

	return new Response(undefined, { headers, status: 401 });
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
	const getCookie = request.headers.get('cookie') || '';
	let { refreshToken, customToken } = cookie.parse(getCookie);

	if (!refreshToken) {
		return unauthorized();
	}

	let headers = {};
	let user = {};

	try {
		user = await auth().verifyIdToken(customToken);
	} catch (e) {
		const refreshRes = await post(
			`https://identitytoolkit.googleapis.com/v1/token?key=${ WEB_API_KEY }`,
			{ grant_type: 'refresh_token', refresh_token: refreshToken },
		);

		if (!refreshRes.ok) {
			return unauthorized();
		}

		const tokens = await refreshRes.json();
		const idToken = tokens.id_token;

		if (tokens.refresh_token !== refreshToken) {
			return unauthorized();
		}

		try {
			user = await auth().verifyIdToken(idToken);
			customToken = await auth().createCustomToken(user.uid);
			headers = customTokenCookie(customToken);
		} catch (e) {
			unauthorized();
		}
	}

	return json(
		{
			username: user.name.toLowerCase(),
			userId: user.uid,
		},
		{ headers, status: 200 },
	);
}
