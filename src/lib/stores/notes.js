import { createPersistentStore } from '$lib/utils/persistentStore.js';
import { NOTES } from '$lib/utils/constants.js';
import { get } from 'svelte/store';

function createNoteStore() {
	const notes = createPersistentStore(NOTES);
	const { subscribe, update, set } = notes;

	return {
		subscribe,
		addNote: (moduleName, name) =>
			update((notes) => [
				...notes,
				{
					moduleName,
					name,
					content: '',
					createdAt: Date.now(),
				},
			]),
		getFromModule: (moduleName) =>
			get(notes).filter((note) => note.moduleName === moduleName),
		setNotes: (data) => update((notes) => [...notes, ...data]),
		reset: () => set([]),
	};
}

export const notes = createNoteStore();
