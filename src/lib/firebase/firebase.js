import { initializeApp } from 'firebase/app';
import { getAuth, signOut as _signOut } from 'firebase/auth';
import { FIREBASE_CONFIG } from '$lib/utils/constants.js';
import { goto } from '$app/navigation';
import { post } from '$lib/api.js';

const firebaseOptions = JSON.parse(FIREBASE_CONFIG);
const app = initializeApp(firebaseOptions, 'CLIENT');
const auth = getAuth(app);

export async function signOut() {
	await post('/api/auth/signOut');
	await _signOut(auth);
	await goto('/auth');
}
