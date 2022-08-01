<script>
	import GoogleAuth from './GoogleAuth.svelte';
	import SignIn from './SignIn.svelte';
	import SignUp from './SignUp.svelte';
	import 'styles/auth.scss';

	let isLoginForm = true;

	function selectLogInTab() {
		isLoginForm = true;
	}

	function selectSignUpTab() {
		isLoginForm = false;
	}
</script>

<div>
  <h1 class="title">CustNote</h1>
  <ul class="auth-tabs">
    <li class:highlighted-tab={ isLoginForm } on:click={ selectLogInTab }><span>Log In</span></li>
    <li class:highlighted-tab={ !isLoginForm } on:click={ selectSignUpTab }><span>Sign Up</span></li>
  </ul>
  <GoogleAuth { isLoginForm } />
  <p class="line"><span>or</span></p>
  {#if isLoginForm}
    <SignIn />
  {:else}
    <SignUp />
  {/if}
</div>

<style lang="scss">
	.title {
		font-size: 2rem;
		font-weight: $fw-bold;
		margin-bottom: 1em;
	}

	.auth-tabs {
		display: flex;
		list-style: none;
		margin-bottom: 1em;
		user-select: none;

		li {
			cursor: pointer;
			width: 50%;
		}
	}

	.highlighted-tab {
		border-bottom: 3px solid $blue;
	}

	.line {
		color: #fff;
		font-weight: $fw-light;
		margin: 0.7em auto;
		overflow: hidden;
		width: 70%;

		&::before,
		&::after {
			border-bottom: 1px solid;
			content: '';
			display: inline-block;
			margin: 0 .5em 0 -55%;
			vertical-align: middle;
			width: 50%;
		}

		&::after {
			margin: 0 -55% 0 0.5em;
		}

		span {
			display: inline-block;
			vertical-align: middle;
		}
	}
</style>