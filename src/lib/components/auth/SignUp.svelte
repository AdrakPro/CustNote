<script lang="ts">
	import { goto } from '$app/navigation';
	import { notify } from '$lib/stores/notify.js';
	import { validateSignUpForm } from '$lib/utils/validators.ts';

	let email = '';
	let username = '';
	let password = '';

	async function signUp() {
		const error = validateSignUpForm(email, username, password);

		if (error) {
			notify.danger(error);
			return;
		}

		const signUpRes = await fetch('/api/new-user.json', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			credentials: 'same-origin',
			body: JSON.stringify({ email, password, username }),
		});

		if (signUpRes.ok) {
			await goto('/dashboard');
		} else {
			notify.danger('The email is already in use!');
		}
	}
</script>

<!-- Styles imported from Auth.svelte (auth.scss) -->
<div class="input-fields">
	<input bind:value={ email } name="email" placeholder="Email" type="email" />
	<input bind:value={ username } name="username" placeholder="Username" type="text" />
	<input bind:value={ password } name="password" placeholder="Password" type="password" />
</div>
<p class="info">By signing up, you agree to our <a href="#">terms of service</a> and <a href="#">privacy
	policy</a>.
</p>
<!-- Temporary disable sign up -->
<button disabled class="submit-button" on:click={ () => signUp() }>Sign Up ></button>
