import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const { ok } = await fetch('/api/auth/signIn.json');

	if (!ok) {
		throw redirect(302, '/auth');
	}

	return {};
}
