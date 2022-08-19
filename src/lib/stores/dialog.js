import { writable } from 'svelte/store';

function createDialogStore() {
	const { subscribe, set } = writable(false);

	return {
		subscribe,
		show: () => set(true),
		close: () => set(false),
	};
}

export const dialog = createDialogStore();
