import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

// TODO encrypt store
export function createPersistentStore(key) {
	return persist(writable([]), createLocalStorage(), key);
}
