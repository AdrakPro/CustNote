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

export async function getDataFromModel(model, id, include) {
	let data = {};

	try {
		data = await prisma[model].findUnique({
			where: { id },
			include,
		});
	} catch (e) {
		throw new error(400, e.message);
	}

	return data;
}
