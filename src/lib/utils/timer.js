import { onDestroy } from 'svelte';
import { notes } from '$lib/stores/notes.js';
import { put } from '$lib/api.js';

function onInterval(callback, milliseconds) {
	const interval = setInterval(callback, milliseconds);

	onDestroy(() => clearInterval(interval));
}

export function startNoteSavingInterval(userId, moduleName) {
	onInterval(async () => {
		const modifiedNotes = notes.getModifiedNotes();

		for (const note of modifiedNotes) {
			put(
				`/api/${userId}/module/${moduleName}/notes/${note.name}.json`,
				{ content: note.content },
				userId
			);

			// Reset modified status
			note.modified = false;
		}
	}, 300_000);
}
