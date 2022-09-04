import { redirect } from '@sveltejs/kit';
import { modules } from '$lib/stores/modules.js';
import { isStoreEmpty } from '$lib/utils/persistentStore.js';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const authRes = await fetch('/api/auth/signIn.json');

	if (!authRes.ok) {
		throw redirect(302, '/auth');
	}

	const { userId } = await authRes.json();

	if (isStoreEmpty(modules)) {
		const modulesRes = await fetch(`/api/${userId}/modules.json`);
		const fetchedModules = await modulesRes.json();

		modules.setModules(fetchedModules);
	}

	return { userId };
}
