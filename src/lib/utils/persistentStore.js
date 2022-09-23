import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

export function createPersistentStore(key, defaultValue) {
	return persist(writable(defaultValue), createLocalStorage(), key);
}
