import { redirect } from '@sveltejs/kit';
import { modules } from '$lib/stores/modules.js';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const authRes = await fetch('/api/auth/signIn.json');

	if (!authRes.ok) {
		throw redirect(302, '/auth');
	}

	const { userId } = await authRes.json();

	if (modules.areModulesNotExist()) {
		const modulesRes = await fetch(`/api/${ userId }/modules.json`);

		if (modulesRes.ok) {
			const fetchedModules = await modulesRes.json();

			modules.setModules(fetchedModules);
		}
	}

	return { userId };
}
