import { writable } from 'svelte/store';

function createModuleStore() {
	const { subscribe, update } = writable([]);

	return {
		subscribe,
		addModule: (name) =>
			update((module) => [
				...module,
				{
					name,
					lastEdit: '',
					createdAt: Date.now(),
				},
			]),
	};
}

export const modules = createModuleStore();
