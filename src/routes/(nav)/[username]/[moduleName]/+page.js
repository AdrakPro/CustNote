// ogarnij czy to nie ma byc +server (czy jest zalogowany -> czy username taki istnieje -> czy taki modul istnite)
import { redirect } from '@sveltejs/kit';

export async function load({ fetch }) {
	const authRes = fetch('/api/auth.json');

	if (!authRes.ok) {
		throw redirect(302, '/auth');
	}

	return {};
}
