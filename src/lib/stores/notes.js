import { get, writable } from 'svelte/store';

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

		deleteMany: (moduleName) =>
			update((notes) => notes.filter((note) => note.moduleName !== moduleName)),

		notExist: (moduleName) =>
			get(notes).filter((note) => note.moduleName === moduleName).length === 0,

		getModifiedNotes: () => get(notes).filter((note) => note.modified === true),
		reset: () => set([]),
	};
}

export const notes = createNoteStore();
