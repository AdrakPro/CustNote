import { getDataFromModel } from '$lib/prisma.js';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const { userId } = params;
	const { modules } = await getDataFromModel(userId, { modules: true });
	// Poczytaj o tym jeszcze
	const headers = { 'cache-control': 'max-age=1800, s-maxage=1800' };

	return json(modules, { headers, status: 200 });
}
