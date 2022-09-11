import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const authRes = await fetch('/api/auth/signIn.json');

	if (!authRes.ok) {
		throw redirect(302, '/auth');
	}

	const { userId } = await authRes.json();
	const { moduleName } = params;

	const notesRes = await fetch(`/api/${userId}/module/${moduleName}/notes.json`)
	const notes = await notesRes.json();

	return { moduleName, notes };
}
