import { SECURE } from '$lib/utils/constants.js';

export async function POST () {
	const headers = new Headers();
	headers.append('set-cookie', `customToken=_; Max-Age=0; Path=/;${ SECURE } HttpOnly`);
	headers.append('set-cookie', `refreshToken=_; Max-Age=0; Path=/;${ SECURE } HttpOnly`);
	headers.set('cache-control', 'no-store');

	return new Response(undefined, { headers, status: 200 });
}