<script>
	import Auth from '$lib/components/auth/Auth.svelte';
	import Notify from '$lib/components/Notify.svelte';
</script>

<Notify />
<div class="container">
	<div class="auth-form">
		<Auth />
	</div>
</div>

<svelte:head>
	<title>CustNote | Auth</title>
</svelte:head>

<style lang="scss">
  .container {
    height: 100vh;
    overflow: hidden;
  }

  // Center auth-form using top/left/margin/height/width
  .auth-form {
    border: 3px solid $blue;
    border-bottom: none;
    height: 550px;
    left: 50%;
    margin: -275px 0 0 -160px;
    padding-top: $s-12;
    position: fixed;
    text-align: center;
    top: 50%;
    width: 320px;
  }

  /* Remove border on mobile */
  @media screen and (max-width: $b-mobile) {
    .auth-form {
      border: none;
    }
  }
</style>