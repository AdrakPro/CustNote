import { redirect } from '@sveltejs/kit';
import { notes } from '$lib/stores/notes.js';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const authRes = await fetch('/api/auth/signIn.json');

	if (!authRes.ok) {
		throw redirect(302, '/auth');
	}

	const { moduleName } = params;

	// Todo refactor tego, plus modules + notes refactor do persistent stora

	if (isNotesEmpty(moduleName)) {
		const { userId } = await authRes.json();
		const notesRes = await fetch(
			`/api/${userId}/module/${moduleName}/notes.json`
		);
		const fetchedNotes = await notesRes.json();

		notes.setNotes(fetchedNotes);
	}

	return { moduleName };
}

function isNotesEmpty(moduleName) {
	return (
		get(notes).filter((note) => note.moduleName === moduleName).length === 0
	);
}
