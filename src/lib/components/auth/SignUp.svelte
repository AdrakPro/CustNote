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
			headers: new Headers({ 'content-type': 'application/json' }),
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
	<input
		bind:value={ email }
		type="email"
		name="email"
		placeholder="Email"
	/>
	<input
		bind:value={ username }
		type="text"
		name="username"
		placeholder="Username"
	/>
	<input
		bind:value={ password }
		type="password"
		name="password"
		placeholder="Password"
	/>
</div>
<p class="info">By signing up, you agree to our <a href="#">terms of service</a> and <a href="#">privacy
	policy</a>.
</p>
<!--<p style="color: red">Registration is temporarily disabled</p>-->
<button
	class="submit-button"
	on:click={ () => signUp() }
>Sign Up ></button>
