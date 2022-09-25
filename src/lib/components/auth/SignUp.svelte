<script lang="ts">
	import { redirectTo } from '$lib/utils/redirect.js';
	import { post } from '$lib/api.js';
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

		const { ok } = await post('api/auth/signUp', { email, password, username }, null);

		if (ok) {
			await redirectTo('/dashboard');
		} else {
			notify.danger('The email is already in use!');
		}
	}
</script>

<!-- Styles imported from Auth.svelte (auth.scss) -->
<div class="input-fields">
	<input
		bind:value={ email }
		name="email"
		placeholder="Email"
		type="email"
	/>
	<input
		bind:value={ username }
		name="username"
		placeholder="Username"
		type="text"
	/>
	<input
		bind:value={ password }
		name="password"
		placeholder="Password"
		type="password"
	/>
</div>
<p class="info">By signing up, you agree to our <a href="#">terms of service</a> and <a href="#">privacy
	policy</a>.
</p>
<!--<p style="color: red">Registration is temporarily disabled</p>-->
<button
	class="submit-button"
	on:click={ () => signUp() }
>Sign Up >
</button>
