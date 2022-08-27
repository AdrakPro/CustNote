import { PrismaClient } from '@prisma/client';
import { DEV } from '$lib/utils/constants.js';

let prisma = global.prisma || new PrismaClient();

if (DEV) {
	global.prisma = prisma
}

export default prisma;
