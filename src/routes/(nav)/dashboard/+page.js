import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
	const authRes = await fetch('/api/auth/signIn.json');

	if (!authRes.ok) {
		throw redirect(302, '/auth');
	}

	const { user } = await authRes.json();
	const token = user.uid;

	// const { user } = await authRes.json();
	// console.log(user);
	// // ogarnij get z parametrem
	// const modulesRes = await fetch(`/api/${user_id}/get-modules.json`);
	// const fetchedModules = await modulesRes.json();
	// modules.setModules(fetchedModules);
	//
	return {
		token,
	};
}
