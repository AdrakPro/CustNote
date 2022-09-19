import { deleteData, updateData } from '$lib/prisma.js';
import { NOTE } from '$lib/utils/constants.js';
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, params }) {
	const { content } = await request.json();
	const { noteName } = params;
	const query = {
		where: {
			name: noteName,
		},
		data: {
			content,
		},
	};

	updateData(NOTE, query).catch((e) => {
		return new error(500, e.message);
	});

	return new Response(undefined, { status: 200 });
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
	const { noteName } = params;
	const query = {
		where: {
			name: noteName,
		},
	};

	await deleteData(NOTE, query).catch((e) => {
		return new error(500, e.message);
	});

	// note was deleted successfully
	return json({});
}
