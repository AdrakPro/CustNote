<script>
    import '../styles/global.scss';

    let isOpenMenu = false;
</script>

<div class:mobile-nav={ isOpenMenu }>
  <header>
    <div class="logo">
      <img alt="icon" height="64" src="favicon.png" width="64" />
    </div>
    <input bind:checked={ isOpenMenu } class="toggle-menu" id="toggle-menu" type="checkbox">
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Why CustNote?</a></li>
        <li><a href="#">Plans</a></li>
      </ul>
      <ul class:utility-nav={ !isOpenMenu }>
        <li><a href="#">Help</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
    <label class="toggle-menu-label" for="toggle-menu">
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
  .mobile-nav {
    .logo,
    main {
      filter: brightness(45%);
    }
  }

  /* HEADER */
  header {
    height: 4em;
    position: fixed;
    width: 100%;
    z-index: 999;
  }

  /* NAVIGATION */
  nav {
    position: absolute;
    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 400ms ease-in-out;
    width: 100%;

    ul {
      list-style: none;
    }

    li {
      margin-bottom: 1.6em;
      text-align: center;
    }

    a {
      color: $font-color;
      font-size: 1.2rem;
      opacity: 0;
      text-align: center;
      text-decoration: none;
      transition: opacity 150ms ease-in-out;
    }
  }

  /* TOGGLE MENU BUTTON */
  /* Allow menu button to me taggable */
  .toggle-menu {
    left: -9999px;
    position: absolute;
    top: -9999px;
  }

  /* Todo - Add circle instead of outline */
  .toggle-menu:focus-visible ~ .toggle-menu-label {
    margin-top: 1px;
    outline: 1px solid $font-color;
  }

  .toggle-menu:checked ~ nav {
    transform: scale(1, 1);
  }

  .toggle-menu:checked ~ nav a {
    opacity: 1;
    transition: opacity 250ms ease-in-out 250ms;
  }

  .toggle-menu-label {
    align-items: center;
    display: flex;
    height: 100%;
    margin-right: 1em;
    position: absolute;
    right: 0;
    top: 0;
  }

  .toggle-menu-label span,
  .toggle-menu-label span::before,
  .toggle-menu-label span::after {
    background-color: $font-color;
    border-radius: 2px;
    display: block;
    height: 2px;
    position: relative;
    width: 1.7em;
  }

  .toggle-menu-label span::before,
  .toggle-menu-label span::after {
    content: "";
    position: absolute;
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
      background: none;

      /* Edge support */
      display: flex;
      left: initial;
      position: relative;
      text-align: left;
      top: initial;
      transform: scale(1, 1);
      transition: none;

      ul {
        display: flex;
        padding-top: 0.9em;
      }

      li {
        line-height: 2.25em;
        margin-left: 2em;
      }

      /* Todo - Based on site hover a nav button (Welcome page -> Home button is hovered) */
      a {
        opacity: 1;
        position: relative;

        &::before {
          background-color: $primary;
          content: "";
          display: block;
          height: 3px;
          left: 0;
          position: absolute;
          right: 0;
          top: 1.5em;
          transform: scale(0, 1);
          transition: transform ease-in-out 250ms;
        }

        &:hover {
          opacity: 0.9;

          &::before {
            transform: scale(1, 1);
          }
        }
      }
    }
  }

  /* Experimental - used to fix fixed header */
  .header-dummy {
    height: 4em;
  }

  /* Experimental - used to align li elements to the right of the nav */
  .utility-nav {
    margin: 0 1.5em 0 auto;
  }
</style>
