import { getDataFromModel } from '$lib/prisma.js';
import { json } from '@sveltejs/kit';
import { USER } from '$lib/utils/constants.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const { userId } = params;
	const query = {
		where: {
			id: userId,
		},
		include: {
			modules: {
				orderBy: {
					createdAt: 'asc',
				},
				select: {
					name: true,
					createdAt: true,
				},
			},
		},
	};
	const user = await getDataFromModel(USER, query);

	if (user === null) {
		return json([]);
	}

	const { modules } = user;
	const headers = { 'cache-control': 'max-age=0, s-maxage=1800' };

	return json(modules, { headers, status: 200 });
}
