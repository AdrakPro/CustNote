<script>
  import GoogleAuth from './GoogleAuth.svelte';
  import SignIn from './SignIn.svelte';
  import SignUp from './SignUp.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import '$styles/auth.scss';

  let isLoginForm = true;

  function selectLogInTab() {
    isLoginForm = true;
  }

  function selectSignUpTab() {
    isLoginForm = false;
  }
</script>

<div>
  <h1 class="title">
    <Icon height="70" src="/logo.png" width="263" />
  </h1>
  <ul class="auth-tabs">
    <li
      class:highlighted-tab={isLoginForm}
      on:click={() => selectLogInTab()}
    >
      <span>Log In</span>
    </li>
    <li
      class:highlighted-tab={!isLoginForm}
      on:click={() => selectSignUpTab()}
    >
      <span>Sign Up</span>
    </li>
  </ul>
  <GoogleAuth {isLoginForm} />
  <p class="line"><span>or</span></p>
  {#if isLoginForm}
    <SignIn />
  {:else}
    <SignUp />
  {/if}
</div>

<style lang="scss">
  .title {
    margin-bottom: $s-20;
  }

  .auth-tabs {
    display: flex;
    list-style: none;
    margin-bottom: $s-16;
    user-select: none;

    li {
      cursor: pointer;
      padding-bottom: $s-6;
      width: 50%;
    }
  }

  .highlighted-tab {
    border-bottom: 3px solid $blue;
  }

  .line {
    color: #fff;
    font-weight: $fw-light;
    margin: 0.7rem auto;
    overflow: hidden;
    width: 70%;

    &::before,
    &::after {
      border-bottom: 1px solid;
      content: '';
      display: inline-block;
      margin: 0 0.5rem 0 -55%;
      vertical-align: middle;
      width: 50%;
    }

    &::after {
      margin: 0 -55% 0 0.5rem;
    }

    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>
