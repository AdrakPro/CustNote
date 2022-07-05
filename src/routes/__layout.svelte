<script>
    import '../styles/global.css';

    let isOpenMenu = false;
</script>

<div class:mobile-nav={ isOpenMenu }>
    <header>
        <div class="logo">
            <img src="favicon.png" width="64" height="64" alt="icon">
        </div>
        <input type="checkbox" id="toggle-menu" class="toggle-menu" bind:checked={ isOpenMenu }>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Why CustNote?</a></li>
                <li><a href="#">Plans</a></li>
            </ul>
            <ul class:utility-nav={ !isOpenMenu }>
                <li><a href="#">Help</a></li>
                <li><a href="#">Login</a></li>
            </ul>
        </nav>
        <label for="toggle-menu" class="toggle-menu-label">
            <span></span>
        </label>
    </header>

    <main>
        <div class="header-dummy"></div>
        <slot />
    </main>

    <footer></footer>
</div>

<style lang="scss">
  /* FULL PAGE OVERLAY */
  .mobile-nav {
    main, .logo {
      filter: brightness(45%);
    }
  }

  /* HEADER */
  header {
    position: fixed;
    width: 100%;
    height: 64px;
    z-index: 999;
  }

  /* NAVIGATION */
  nav {
    position: absolute;
    width: 100%;
    height: 100vh;
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 400ms ease-in-out;
    padding-top: 1em;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      text-align: center;
      margin-bottom: 1.6em;
    }

    a {
      transition: opacity 150ms ease-in-out;
      color: #e7e4f9;
      text-decoration: none;
      font-size: 1.2em;
      opacity: 0;
      text-align: center;
    }
  }

  /* TOGGLE MENU BUTTON */
  /* Allow menu button to me taggable */
  .toggle-menu {
    position: absolute !important;
    top: -9999px !important;
    left: -9999px !important;
  }

  /* Todo - Add circle instead of outline */
  .toggle-menu:focus ~ .toggle-menu-label {
    margin-top: 1px;
    outline: 1px solid white;
  }

  .toggle-menu:checked ~ nav {
    transform: scale(1, 1);
  }

  .toggle-menu:checked ~ nav a {
    opacity: 1;
    transition: opacity 250ms ease-in-out 250ms;
  }

  .toggle-menu-label {
    display: flex;
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    margin-right: 1em;
    align-items: center;
  }

  .toggle-menu-label span,
  .toggle-menu-label span::before,
  .toggle-menu-label span::after {
    display: block;
    position: relative;
    height: 2px;
    width: 1.7rem;
    background: #e7e4f9;
    border-radius: 2px;
  }

  .toggle-menu-label span::before,
  .toggle-menu-label span::after {
    position: absolute;
    content: "";
  }

  .toggle-menu-label span::before {
    bottom: 7px;
  }

  .toggle-menu-label span::after {
    top: 7px;
  }

  /* TODO CLOSE MENU BUTTON */
  /* RESPONSIVE STYLE WHEN SCREEN EXCEEDS 900PX */
  @media screen and (min-width: 900px) {
    .toggle-menu-label {
      display: none;
    }

    header {
      display: flex;
    }

    nav {
      display: flex;

      /* Edge support */
      position: relative;
      top: initial;
      left: initial;
      transform: scale(1, 1);
      transition: none;
      text-align: left;
      background: none;

      ul {
        display: flex;
      }

      li {
        line-height: 36px;
        margin-left: 2em;
      }

      /* Todo - Based on site hover a nav button (Welcome page -> Home button is hovered) */
      a {
        position: relative;
        opacity: 1;

        &::before {
          display: block;
          position: absolute;
          height: 3px;
          top: 1.5em;
          left: 0;
          right: 0;
          transform: scale(0, 1);
          transition: transform ease-in-out 250ms;
          content: "";
          background: #46bddf;
        }

        &:hover {
          opacity: 0.9;
        }

        &:hover::before {
          transform: scale(1, 1);
        }
      }
    }
  }

  /* Experimental - used to fix fixed header */
  .header-dummy {
    height: 64px;
  }

  /* Experimental - used to align li elements to the right of the nav */
  .utility-nav {
    margin-left: auto;
    margin-right: 1.5em;
  }
</style>
