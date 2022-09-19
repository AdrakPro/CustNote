import { createPersistentStore } from '$lib/utils/persistentStore.js';
import { NOTES } from '$lib/utils/constants.js';
import { get } from 'svelte/store';

function createNoteStore() {
	const notes = createPersistentStore(NOTES);
	const { subscribe, update, set } = notes;

	return {
		subscribe,
		addNote: (moduleName, name) =>
			update((state) => [
				...state,
				{
					moduleName,
					name,
					// Need enter to show slash plugin
					content: `# ${name}`,
					modified: false,
					createdAt: Date.now(),
				},
			]),
		setContent: (name, content) =>
			update((notes) => {
				const modifiedNote = notes.find((note) => note.name === name);

				modifiedNote.content = content;
				modifiedNote.modified = true;

				return notes;
			}),
		set: (data) => update((notes) => [...notes, ...data]),

		delete: (name) =>
			update((notes) => notes.filter((note) => note.name !== name)),

		notExist: (moduleName) =>
			get(notes).filter((note) => note.moduleName === moduleName).length === 0,

		getModifiedNotes: () => get(notes).filter((note) => note.modified === true),
		reset: () => set([]),
	};
}

export const notes = createNoteStore();
