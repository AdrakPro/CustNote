<script>
	import Icon from '$lib/components/Icon.svelte';
	import NavBar from '$lib/components/nav/NavBar.svelte';
	import '../styles/global.scss';

	let isOpenMenu = false;
</script>

<div class:mobile-nav={ isOpenMenu }>
	<header>
		<Icon height="64" src="favicon.png" width="64" />
		<NavBar bind:isOpenMenu={ isOpenMenu } />
	</header>

	<main>
		<div class="header-dummy"></div>
		<slot />
	</main>

	<footer></footer>
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
    z-index: $z-index-max;
  }

  @media screen and (min-width: $b-mobile) {
    header {
      display: flex;
    }
  }

  /* Experimental - used to fix fixed header */
  .header-dummy {
    height: 64px;
  }
</style>
