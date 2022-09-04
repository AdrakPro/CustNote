import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';
import { get, writable } from 'svelte/store';

// TODO encrypt store
export function createPersistentStore(key) {
	return persist(writable([]), createLocalStorage(), key);
}

export function isStoreEmpty(store) {
	return get(store).length === 0;
}
