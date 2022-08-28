import prisma from '$lib/prisma.js';
import { error, json } from '@sveltejs/kit';

export async function GET(event) {
	const { userId } = await event.params;
	let data;

	try {
		data = await prisma.user.findUnique({
			where: { id: userId },
			include: {
				modules: true,
			},
		});
	} catch (e) {
		throw new error(400, e.message);
	}

	const { modules } = data;
	const headers = {
		'cache-control': 'max-age=1800, s-maxage=1800',
	};

	return json(modules, { headers });
}
