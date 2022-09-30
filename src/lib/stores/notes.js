import { get, writable } from 'svelte/store';
import { getNewDeadline } from '$lib/utils/date.js';

// Fow now it's not persistent store, because revise deadlines need to refresh every 4:00
function createNoteStore() {
	const notes = writable([]);
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
		setContent: (name, content) =>
			update((notes) => {
				const index = notes.findIndex((note) => note.name === name);

				notes[index].content = content;
				notes[index].modified = true;

				return notes;
			}),
		set: (data) => update((notes) => [...notes, ...data]),

		delete: (name) =>
			update((notes) => notes.filter((note) => note.name !== name)),

		deleteMany: (moduleName) =>
			update((notes) => notes.filter((note) => note.moduleName !== moduleName)),

		notExist: (moduleName) =>
			get(notes).filter((note) => note.moduleName === moduleName).length === 0,

		getModifiedNotes: () => get(notes).filter((note) => note.modified === true),
		reset: () => set([]),
	};
}

export const notes = createNoteStore();
