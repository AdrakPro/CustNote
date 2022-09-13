import { createPersistentStore } from '$lib/utils/persistentStore.js';
import { NOTES } from '$lib/utils/constants.js';

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
					content: '',
					createdAt: Date.now(),
				},
			]),
		setNotes: (data) => update((notes) => [...notes, ...data]),
		reset: () => set([]),
	};
}

export const notes = createNoteStore();
