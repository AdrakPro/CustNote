import { createPersistentStore } from '$lib/utils/persistentStore.js';
import { NOTES } from '$lib/utils/constants.js';

function createNoteStore() {
	const { subscribe, update, set } = createPersistentStore(NOTES);

	return {
		subscribe,
		addNote: (moduleName, name) =>
			update((state) => [
				...state,
				{
					moduleName,
					name,
					content: '',
					modified: false,
					createdAt: Date.now(),
				},
			]),
		setNotes: (data) => update((notes) => [...notes, ...data]),
		reset: () => set([]),
	};
}

export const notes = createNoteStore();
