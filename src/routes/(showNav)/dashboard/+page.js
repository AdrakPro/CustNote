import { redirect } from '@sveltejs/kit';
import { modules } from '$lib/stores/modules.js';

export async function load({ fetch }) {
	const authRes = await fetch('/api/auth.json');

	if (!authRes.ok) {
		throw redirect(302, '/auth');
	}

	const { user } = await authRes.json();
	const { name, user_id } = user;
	const username = name.toLowerCase();

	// ogarnij get z parametrem
	const modulesRes = await fetch(`/api/${user_id}/get-modules.json`);
	const fetchedModules = await modulesRes.json();
	modules.setModules(fetchedModules);

	return {
		username,
		userId: user_id,
	};
}
