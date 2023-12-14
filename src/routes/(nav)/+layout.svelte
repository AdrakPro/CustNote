<script>
  import Icon from '$lib/components/Icon.svelte';
  import NavBar from '$lib/components/nav/NavBar.svelte';
  import Dialog from '$lib/components/dialog/Dialog.svelte';
  import Notify from '$lib/components/Notify.svelte';

  let isOpenMenu = false;
</script>

<div class:mobile-nav={isOpenMenu}>
  <Dialog />
  <Notify />
  <header>
    <span class="logo"
      ><Icon
        height="48"
        src="/logo-smaller.png"
        width="180"
      /></span
    >
    <NavBar bind:isOpenMenu />
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

  .logo {
    margin: $s-6 0 0 $s-12;
  }

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
