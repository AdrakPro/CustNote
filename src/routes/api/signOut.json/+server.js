import { removeTokens } from '$lib/utils/tokenManager.js';

export async function POST() {
	const headers = removeTokens();

	return new Response(undefined, { headers, status: 200 });
}