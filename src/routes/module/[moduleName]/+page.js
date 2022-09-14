import { redirect } from '@sveltejs/kit';
import { notes } from '$lib/stores/notes.js';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const authRes = await fetch('/api/auth/signIn.json');

	if (!authRes.ok) {
		throw redirect(302, '/auth');
	}

	const { userId } = await authRes.json();
	const { moduleName } = params;

	if (notes.areNotesNotExist(moduleName)) {
		const notesRes = await fetch(
			`/api/${userId}/module/${moduleName}/notes.json`
		);
		const fetchedNotes = await notesRes.json();

		notes.setNotes(fetchedNotes);
	}

	return {
		moduleName,
		userId
	};
}
