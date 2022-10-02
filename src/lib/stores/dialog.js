import { get, writable } from 'svelte/store';

function createDialogStore() {
	const dialog = writable({
		name: '',
		show: false,
		data: null,
	});
	const { subscribe, update } = dialog;

	return {
		subscribe,
		show: (name, data) =>
			update((dialog) => {
				dialog.name = name;
				dialog.show = true;
				dialog.data = data;

				return dialog;
			}),
		close: () =>
			update((dialog) => {
				dialog.name = '';
				dialog.show = false;
				dialog.data = null;

				return dialog;
			}),
		getData: () => get(dialog).data,
	};
}

export const dialog = createDialogStore();

// Dialog components names
export const ADD_MODULE = 'AddModuleContent';
export const DELETE_MODULE = 'DeleteModuleContent';
export const ADD_NOTE = 'AddNoteContent';
export const ADD_SESSION = 'AddSessionContent';
