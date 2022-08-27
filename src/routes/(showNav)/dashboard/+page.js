import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
	const authRes = await fetch('/api/auth.json');

	if (!authRes.ok) {
		throw redirect(302, '/auth');
	}

	const { user } = await authRes.json();
	const { name, user_id } = user;
	const username = name.toLowerCase();

	return {
		username,
		userId: user_id,
	};
}
