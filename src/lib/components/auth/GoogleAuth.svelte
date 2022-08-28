<script>
	import Icon from '../Icon.svelte';

	export let isLoginForm = true;

	$: getText = () => isLoginForm ? 'LOG IN' : 'SIGN UP';
</script>

<button class="google-button">
	<Icon
		src="icons/google.png"
		width="36"
		height="36"
	/>
	<span>{ getText() } WITH GOOGLE</span>
</button>

<style lang="scss">
  .google-button {
    align-items: center;
    background-color: $blue;
    border-radius: $base-radius;
    cursor: pointer;
    display: flex;
    height: 40px;
    justify-content: center;
    margin: 0 1rem 0.2rem 1rem;
    width: 90%;

    &:hover {
      background-color: $dark-blue;
      transition: background-color 200ms ease-in-out;
    }

    span {
      color: $white;
      font-size: $fs-14;
      font-weight: $fw-bold;
    }
  }
</style>