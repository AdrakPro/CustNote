import { resetTokens } from '$lib/utils/tokenManager.js';

/** @type {import('./$types').RequestHandler} */
export async function POST() {
	const headers = resetTokens();

	return new Response(undefined, { headers, status: 302 });
}
