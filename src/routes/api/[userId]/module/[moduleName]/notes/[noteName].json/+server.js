import { updateData } from '$lib/prisma.js';
import { NOTE } from '$lib/utils/constants.js';

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

	updateData(NOTE, query).catch(() => {
		return new Response(undefined, { status: 500 });
	});

	return new Response(undefined, { status: 200 });
}
