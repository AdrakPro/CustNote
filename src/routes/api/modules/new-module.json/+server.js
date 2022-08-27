import prisma from '$lib/prisma.js';
import { error } from '@sveltejs/kit';

export async function POST(event) {
	const { name, userId } = await event.request.json();

	try {
		await prisma.module.create({
			data: {
				name,
				user: { connect: { id: userId } },
			},
		});
	} catch (e) {
		throw new error(400, e.message,);
	}

	return new Response(undefined, { status: 200 });
}
