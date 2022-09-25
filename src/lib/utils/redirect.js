import { goto } from '$app/navigation';
import { dialog } from '$lib/stores/dialog.js';

export async function redirectTo(path) {
	await goto(path);
	dialog.close();
}