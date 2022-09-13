import { createPersistentStore } from '$lib/utils/persistentStore.js';
import { get } from 'svelte/store';
import { MODULES } from '$lib/utils/constants.js';

function createModuleStore() {
	const modules = createPersistentStore(MODULES);
	const { subscribe, update, set } = modules;

	return {
		subscribe,
		addModule: (name) =>
			update((state) => [
				...state,
				{
					name,
					lastEdit: '',
					// todo fix rozni sie od createdAt prismy
					createdAt: Date.now(),
				},
			]),
		setModules: (modules) => set(modules),
		isEmpty: () => get(modules).length === 0,
		reset: () => set([]),
	};
}

export const modules = createModuleStore();
