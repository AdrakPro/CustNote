import { createDataInModel } from '$lib/prisma.js';
import { MODULE } from '$lib/utils/constants.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { name, userId } = await request.json();

	await createDataInModel(MODULE, {
		name,
		user: { connect: { id: userId } },
	});

	return new Response(undefined, { status: 201 });
}
