import { writable } from 'svelte/store';

function createModuleStore() {
	const { subscribe, set, update } = writable([]);

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
		setModules: (modules) => set(modules),
	};
}

export const modules = createModuleStore();
