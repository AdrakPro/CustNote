<script>
  import '../styles/global.scss'
  import Icon from '$lib/components/Icon.svelte'
  import NavBar from '$lib/components/NavBar.svelte'

  let isOpenMenu = false
</script>

<div class:mobile-nav={ isOpenMenu }>
  <header>
    <Icon src="favicon.png"/>
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
    height: 4em;
    position: fixed;
    width: 100%;
    z-index: 999;
  }

  @media screen and (min-width: 900px) {
    header {
      display: flex;
    }
  }

  /* Experimental - used to fix fixed header */
  .header-dummy {
    height: 4em;
  }
</style>
