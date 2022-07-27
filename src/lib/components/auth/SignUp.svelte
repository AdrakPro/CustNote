<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, userDoc } from '$lib/db/firebase';
	import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
	import { setDoc } from 'firebase/firestore/lite';

	let email: string;
	let username: string;
	let password: string;

	async function signUp() {
		try {
			let { user } = await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(user, { displayName: username });

			await setDoc(userDoc(auth.currentUser.uid), {
				username: user.displayName,
				email: user.email
			});
			await goto('/');
		} catch (e) {
			console.log('Error from creating user', e);
		}
	}
</script>

<div class="input-fields">
  <input bind:value={ email } name="email" placeholder="yours@example.com" type="email">
  <input bind:value={ username } name="username" placeholder="username" type="text">
  <input bind:value={ password } name="password" placeholder="your password" type="password">
</div>
<p class="text">By signing up, you agree to our <a href="#">terms of service</a> and <a href="#">privacy policy</a>.
</p>
<button class="submit-button" on:click={ signUp }>Sign Up ></button>
