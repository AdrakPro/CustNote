import { createRecord } from '$lib/prisma';
import { NOTE } from '$lib/utils/constants.js';
import { getNewDeadline } from '$lib/utils/date.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { moduleName, name } = await request.json();

	await createRecord(NOTE, {
		name,
		reviseDeadline: getNewDeadline(new Date(), 0),
		module: { connect: { name: moduleName } },
	});

	return new Response(undefined, { status: 201 });
}
