import { createPersistentStore } from '$lib/utils/persistentStore.js';
import { MODULES } from '$lib/utils/constants.js';
import { get } from 'svelte/store';

function createModuleStore() {
  const modules = createPersistentStore(MODULES, []);
  const { subscribe, update, set } = modules;

  return {
    subscribe,
    add: (name) =>
      update((modules) => [
        ...modules,
        {
          name,
          lastEdit: '',
          // todo fix rozni sie od createdAt prismy
          createdAt: new Date()
        }
      ]),
    delete: (moduleName) =>
      update((modules) => {
        const index = modules.findIndex(
          (module) => module.name === moduleName
        );

        return modules.splice(index, 0);
      }),
    set: (modules) => set(modules),
    notExist: () => get(modules).length === 0,
    reset: () => set([])
  };
}

export const modules = createModuleStore();
