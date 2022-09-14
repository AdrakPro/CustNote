import { createPersistentStore } from '$lib/utils/persistentStore.js';
import { MODULES } from '$lib/utils/constants.js';

function createModuleStore() {
	const { subscribe, update, set } = createPersistentStore(MODULES);

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
		reset: () => set([]),
	};
}

export const modules = createModuleStore();
