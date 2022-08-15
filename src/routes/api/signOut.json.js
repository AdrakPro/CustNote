import { SECURE } from '$lib/utils/constants.js';

export async function POST() {
	return {
		status: 200,
		headers: {
			'set-cookie': [
				`customToken=_; Max-Age=0; Path=/;${ SECURE } HttpOnly`,
				`refreshToken=_; Max-Age=0; Path=/;${ SECURE } HttpOnly`,
			],
			'cache-control': 'no-store'
		},
	}
}