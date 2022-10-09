import { get, writable } from 'svelte/store';
import { getNewDeadline } from '$lib/utils/date.js';
import { createPersistentStore } from '$lib/utils/persistentStore.js';
import { NOTES } from '$lib/utils/constants.js';

// Fow now it's not persistent store, because revise deadlines need to refresh every 4:00
function createNoteStore() {
	const notes = createPersistentStore(NOTES, []);
	const { subscribe, update, set } = notes;

	return {
		subscribe,
		addNote: (moduleName, name) =>
			update((notes) => [
				...notes,
				{
					moduleName,
					name,
					// Need enter to show slash plugin
					content: `# ${ name }`,
					reviseDeadline: getNewDeadline(new Date(), 0),
					reviseCount: 0,
					modified: false,
					createdAt: Date.now(),
				},
			]),
		// gdy note name nie jest uniklany to bugi sie robia
		setContent: (name, content) =>
			update((notes) => {
				const note = notes.find((note) => note.name === name);

				note.content = content;
				note.modified = true;

				return notes;
			}),
		set: (data) => update((notes) => [...notes, ...data]),

		delete: (name) =>
			update((notes) => notes.filter((note) => note.name !== name)),

		deleteMany: (moduleName) =>
			update((notes) => notes.filter((note) => note.moduleName !== moduleName)),

		// get is messing up (for now it works bec of console.log)
		notExist: (moduleName) => get(notes).filter((note) => note.moduleName === moduleName).length === 0,

		getModifiedNotes: () => get(notes).filter((note) => note.modified === true),

		resetModify: (name) =>
			update((notes) => {
				const note = notes.find((note) => note.name === name);

				note.modified = false;

				return notes;
			}),

		reset: () => set([]),
	};
}

export const notes = createNoteStore();
