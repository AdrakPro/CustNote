<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/db/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';

	let email: string;
	let password: string;

	async function signIn() {
		try {
			let { user } = await signInWithEmailAndPassword(auth, email, password);

			localStorage.setItem('uid', user.uid);
			await goto('/notes');
		} catch (e) {
			console.log('Error sign in', e.message);
		}
	}
</script>

<div class="input-fields">
  <input bind:value={ email } name="email" placeholder="yours@example.com" type="email">
  <input bind:value={ password } name="password" placeholder="your password" type="password">
</div>
<p class="semibold-text"><a href="#">Don't remember your password?</a></p>
<button class="submit-button" on:click={ signIn }>Login ></button>