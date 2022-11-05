import { onDestroy } from 'svelte';
import { notes } from '$lib/stores/notes.js';
import { put } from '$lib/api.js';

export function startNoteSavingInterval(userId, moduleName) {
	const interval = setInterval(async () => saveNotes(userId, moduleName), 10_000);

	onDestroy(() => clearInterval(interval));
}

export async function saveNotes(userId, moduleName) {
	const modifiedNotes = notes.getModifiedNotes();

	for (const note of modifiedNotes) {
		let { name, content } = note;

		await put(
			`/api/${ userId }/module/${ moduleName }/notes/${ name }.json`,
			{ content: content },
			userId,
		);

		// Reset modified status
		notes.resetModify(name);
	}
}
