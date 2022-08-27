<script lang="ts">
	import { goto } from '$app/navigation';
	import { notify } from '$lib/stores/notify.js';
	import { validateEmailAndPassword } from '$lib/utils/validators.ts';

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
			headers: new Headers({ 'Content-Type': 'application/json' }),
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
	<input bind:value={ email } name="email" placeholder="Email" type="email" />
	<input bind:value={ password } name="password" placeholder="Password" type="password" />
</div>
<p class="info"><a href="#">Don't remember your password?</a></p>
<button class="submit-button" on:click={ () => signIn() }>Login ></button>