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
				select: {
					name: true,
					content: true,
					createdAt: true,
				},
			},
		},
	};
	const data = await getDataFromModel(MODULE, query);

	if (data === null) {
		return json([], { status: 204 });
	}

	const { notes, name } = data;

	notes.forEach((note) => {
		note.moduleName = name;
		note.modified = false;
	});
	const headers = { 'cache-control': 'max-age=0, s-maxage=1800' };

	return json(notes, { headers, status: 200 });
}
