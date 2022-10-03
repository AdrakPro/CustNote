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
					reviseDeadline: true,
					reviseCount: true,
					createdAt: true,
				},
			},
		},
	};
	const module = await getDataFromModel(MODULE, query);

	if (module === null) {
		return json([]);
	}

	const { notes, name } = module;

	notes.forEach((note) => {
		note.moduleName = name.toLowerCase();
		note.modified = false;
	});

	return json(notes, { status: 200 });
}
