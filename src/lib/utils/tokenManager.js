import { SECURE } from './constants.js';

function createCustomToken(customToken) {
	const headers = new Headers();
	headers.set(
		'set-cookie',
		`customToken=${customToken}; Max-Age=${
			60 * 55
		}; Path=/;${SECURE} HttpOnly; SameSite=Lax`
	);
	headers.set('cache-control', 'no-store');

	return headers;
}

function createTokens(refreshToken, customToken) {
	const headers = new Headers();
	headers.append(
		'set-cookie',
		`customToken=${customToken}; Max-Age=${
			60 * 55
		}; Path=/;${SECURE} HttpOnly; SameSite=Lax`
	);
	headers.append(
		'set-cookie',
		`refreshToken=${refreshToken}; Max-Age=${
			60 * 60 * 24 * 30
		}; Path=/;${SECURE} HttpOnly; SameSite=Lax`
	);
	headers.set('cache-control', 'no-store');

	return headers;
}

function removeTokens() {
	const headers = new Headers();
	headers.append(
		'set-cookie',
		`customToken=_; Max-Age=0; Path=/;${SECURE} HttpOnly; SameSite=Lax`
	);
	headers.append(
		'set-cookie',
		`refreshToken=_; Max-Age=0; Path=/;${SECURE} HttpOnly; SameSite=Lax`
	);
	headers.set('cache-control', 'no-store');

	return headers;
}

function removeRefreshToken() {
	const headers = new Headers();
	headers.set(
		'set-cookie',
		`refreshToken=; Max-Age=0; Path=/;${SECURE} HttpOnly; SameSite=Lax`
	);
	headers.set('cache-control', 'no-store');

	return headers;
}

export { createCustomToken, createTokens, removeTokens, removeRefreshToken };
