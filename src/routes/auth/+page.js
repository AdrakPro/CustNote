import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
	const authRes = await fetch('/api/auth/signIn.json');

	if (authRes.ok) {
		throw redirect(302, '/dashboard');
	}

	return {};
}
