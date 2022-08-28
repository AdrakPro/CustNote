<script lang="ts">
	import { goto } from '$app/navigation';
	import { notify } from '$lib/stores/notify.js';
	import { validateEmailAndPassword } from '$lib/utils/validators.js';

	let email = '';
	let password = '';

	async function signIn() {
		const error = validateEmailAndPassword(email, password);

		if (error) {
			notify.danger(error);
			return;
		}

		const signInRes = await fetch('/api/auth.json', {
			method: 'POST',
			headers: new Headers({ 'content-type': 'application/json' }),
			credentials: 'same-origin',
			body: JSON.stringify({ email, password }),
		});

		if (signInRes.ok) {
			await goto('/dashboard');
		} else {
			// TODO sprawdz czy ma polaczenie z internetem
			notify.danger('Wrong email or password!');
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
		bind:value={ password }
		type="password"
		name="password"
		placeholder="Password"
	/>
</div>
<p class="info"><a href="#">Don't remember your password?</a></p>
<button
	class="submit-button"
	on:click={ () => signIn() }
>Login ></button>