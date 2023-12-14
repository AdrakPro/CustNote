import { PrismaClient } from '@prisma/client';
import { DEV } from '$lib/utils/constants.js';

let prisma = global.prisma || new PrismaClient();

if (DEV) {
  global.prisma = prisma;
}
// check it
console.log(global.prisma);

export async function createRecord(model, data) {
  try {
    await prisma[model].create({ data });
  } catch (e) {
    return new Response(undefined, { status: 500 });
  }
}

export async function getDataFromModel(model, query) {
  let data;

  try {
    data = await prisma[model].findUnique(query);
  } catch (e) {
    return new Response(undefined, { status: 500 });
  }

  return data;
}

export async function getAllDataFromModel(model) {
  let data;

  try {
    data = await prisma[model].findMany();
  } catch (e) {
    return new Response(undefined, { status: 500 });
  }

  return data;
}

export async function updateRecord(model, query) {
  try {
    await prisma[model].update(query);
  } catch (e) {
    return new Response(undefined, { status: 500 });
  }
}

export async function deleteRecord(model, query) {
  try {
    await prisma[model].delete(query);
  } catch (e) {
    return new Response(undefined, { status: 500 });
  }
}
