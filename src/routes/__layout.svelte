<script>
    import '../styles/global.css';
</script>

<header>
    <div class="logo"><img src="favicon.png" width="64" height="64" alt="icon"></div>
    <div class="row">
        <nav class="top-nav">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Why CustNote?</a></li>
                <li><a href="#">Plans</a></li>
            </ul>
        </nav>
        <nav class="utility-nav">
            <ul>
                <li><a href="#">Help</a></li>
                <li><a href="#">Login</a></li>
            </ul>
        </nav>
    </div>
</header>

<section>
    <div class="header-dummy"></div>
    <slot />
</section>

<footer></footer>

<style lang="scss">
    /* HEADER */
    header {
      position: fixed;
      display: flex;
      width: 100%;
      height: 64px;
      z-index: 999;
    }

    /* NAVIGATION */
    nav {
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      a {
        transition: opacity 150ms ease-in-out;
        color: #e7e4f9;
        text-decoration: none;
        font-size: 1.2rem;
        opacity: 0;

        &:hover {
          opacity: .9;
        }
      }
    }

    /* RESPONSIVE STYLE WHEN SCREEN EXCEEDS 900PX */
    @media screen and (min-width: 900px) {
        nav {
          /* Edge support */
          position: relative;
          top: initial;
          left: initial;
          transform: scale(1, 1);
          transition: none;
          text-align: left;
          background: none;
          /* end Edge support */

          display: flex;
          align-items: center;

          ul {
            display: flex;
          }

          li {
            line-height: 36px;
            margin-left: 2em;
          }

          a {
            position: relative;
            opacity: 1;

            &::before {
              display: block;
              position: absolute;
              height: 3px;
              content: '';
              top: 1.5em;
              left: 0;
              right: 0;
              transform: scale(0, 1);
              transition: transform ease-in-out 250ms;
              background: #46BDDF;
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

    .row {
      width: 100%;
      display: flex;
    }

    /* Experimental - used to align li elements to the right of the nav */
    .utility-nav {
      margin-left: auto;
      margin-right: 20px;
    }

</style>
