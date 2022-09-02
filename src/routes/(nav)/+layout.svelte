<script>
	import Icon from '$lib/components/Icon.svelte';
	import NavBar from '$lib/components/nav/NavBar.svelte';

	let isOpenMenu = false;
</script>

<div class:mobile-nav={ isOpenMenu }>
	<header>
		<span class="logo"><Icon height="64" src="/icons/logo.png" width="64" /></span>
		<NavBar bind:isOpenMenu={ isOpenMenu } />
	</header>

	<main>
		<div class="header-dummy"></div>
		<slot />
	</main>
</div>

<style lang="scss">
  .mobile-nav {
    .logo,
    main {
      filter: brightness(40%);
    }
  }

  /* HEADER */
  header {
    height: 64px;
    position: fixed;
    width: 100%;
    z-index: $max-z-index;
  }

  @media screen and (min-width: $bh-mobile) {
    header {
      display: flex;
    }
  }

  /* Experimental - used to fix fixed header */
  .header-dummy {
    height: 64px;
  }
</style>
