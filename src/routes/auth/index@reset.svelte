<script context="module">
	export async function load({ fetch }) {
		const authRes = await fetch('/api/auth.json');

		if (authRes.ok) {
			return { status: 302, redirect: '/notes' };
		}

		const auth = await authRes.json();

		return {
			props: {
				user: auth.user,
				customToken: auth.customToken
			}
		};
	}
</script>

<script>
	import Icon from '$lib/components/view/Icon.svelte';
	import Auth from '$lib/components/auth/Auth.svelte';
</script>

<div class="container">
  <div class="auth-form">
    <div class="logo">
      <Icon src="favicon.png" />
    </div>
    <Auth />
  </div>
</div>

<style lang="scss">
	.container {
		height: 100vh;
		overflow: hidden;
	}

	.auth-form {
		border: 3px solid $blue;
		border-bottom: none;
		height: 600px;
		left: 50%;
		margin: -300px 0 0 -160px;
		padding-top: 1em;
		position: fixed;
		text-align: center;
		top: 50%;
		width: 320px;
		z-index: 100;
	}

	/* Remove border on mobile */
	@media screen and (max-width: 420px) {
		.auth-form {
			border: none;
		}
	}

	.logo {
		display: flex;
		justify-content: center;
	}
</style>