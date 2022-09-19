import { deleteData } from '$lib/prisma.js';
import { MODULE } from '$lib/utils/constants.js';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
	const { moduleName } = params;
	const query = {
		where: {
			name: moduleName,
		},
	};

	await deleteData(MODULE, query).catch((e) => {
		return new error(500, e.message);
	});

	// module was deleted successfully
	return json({});
}