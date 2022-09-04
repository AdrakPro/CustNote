import { createPersistentStore } from '$lib/utils/persistentStore.js';
import { MODULES } from '$lib/utils/constants.js';

function createModuleStore() {
	const { subscribe, update, set } = createPersistentStore(MODULES);

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
		reset: () => set([]),
	};
}

export const modules = createModuleStore();
