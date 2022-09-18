import { createDataInModel } from '$lib/prisma';
import { NOTE } from '$lib/utils/constants.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { moduleName, name } = await request.json();

	await createDataInModel(NOTE, {
		name,
		module: { connect: { name: moduleName } },
	});

	return new Response(undefined, { status: 201 });
}
