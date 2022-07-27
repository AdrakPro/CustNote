<script>
	import Icon from '../Icon.svelte';

	export let isLoginForm = true;

	$: authForm = () => isLoginForm ? 'LOG IN' : 'SIGN UP';
</script>

<button class="google-button">
  <Icon height="36" src="icons/google.png" width="36" />
  <span class="text">{ authForm() } WITH GOOGLE</span>
</button>

<style lang="scss">
	.google-button {
		align-items: center;
		background-color: $blue;
		border: none;
		border-radius: 5px;
		display: flex;
		height: 2.5em;
		justify-content: center;
		margin: 0 1em 0.2em 1em;
		width: 90%;

		&:hover {
			background-color: $dark-blue;
			transition: background-color 0.2s ease-in-out;
		}

		.text {
			color: $white;
			font-size: 0.9rem;
			font-weight: $fw-bold;
		}
	}
</style>