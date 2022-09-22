import { getDataFromModel } from '$lib/prisma.js';
import { json } from '@sveltejs/kit';
import { MODULE } from '$lib/utils/constants.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const { moduleName } = params;
	const query = {
		where: {
			name: moduleName,
		},
		include: {
			notes: {
				orderBy: {
					createdAt: 'asc',
				},
				select: {
					name: true,
					content: true,
					createdAt: true,
				},
			},
		},
	};
	const { notes, name } = await getDataFromModel(MODULE, query);
	const headers = { 'cache-control': 'max-age=0, s-maxage=1800' };

	if (notes === []) {
		return json([], { headers, status: 204 });
	}

	notes.forEach((note) => {
		note.moduleName = name;
		note.modified = false;
	});

	return json(notes, { headers, status: 200 });
}
