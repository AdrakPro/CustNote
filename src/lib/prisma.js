import { PrismaClient } from '@prisma/client';
import { DEV } from '$lib/utils/constants.js';
import { error } from '@sveltejs/kit';

let prisma = global.prisma || new PrismaClient();

if (DEV) {
	global.prisma = prisma;
}

export async function createDataInModel(model, data) {
	try {
		await prisma[model].create({ data });
	} catch (e) {
		throw new error(400, e.message);
	}
}

export async function getDataFromModel(userId, include) {
	let data = {};

	try {
		data = await prisma.user.findUnique({
			where: { id: userId },
			include,
		});
	} catch (e) {
		throw new error(400, e.message);
	}

	return data;
}
