<script>

</script>

<section class="welcome">
    <div class="text">
        <h1 class="quote">A better way to write, share and organize your notes</h1>
        <p>Take your notes to the next level with a blazing fast speed and various customizing features</p>
        <button class="nav-button"><span>Get started now</span></button>
        <button class="nav-button"><span>See how CustNote works</span></button>
    </div>
    <div class="wave">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,64L48,90.7C96,117,192,171,288,160C384,149,480,75,576,64C672,53,768,107,864,117.3C960,128,1056,96,1152,101.3C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <div class="wave-extension"></div>
    </div>
</section>

<style lang="scss">
  /* INFO PAGE*/
  .welcome {
    height: calc(100vh - 64px);
    position: relative;
  }

  .text {
    padding: 2em 0.5em;
    text-align: center;
  }

  .quote {
    font-size: 2.75rem;
    font-weight: 600;
    letter-spacing: -0.008em;
    margin-bottom: 0.7em;
  }

  p {
    font-size: 1.125rem;
    margin-bottom: 1em;
  }

  /* BUTTONS TODO STYLING */
  .nav-button {
    background-color: $primary;
    border: 1px solid transparent;
    border-radius: 5px;
    color: $font-color;
    display: inline-block;
    font-weight: bold;
    height: 3em;
    line-height: 3em;
    margin: 0 10px;
    position: relative;
    text-align: left;

      span {
        padding: 5px;
      }
  }

  /* WAVE */
  .wave {
    bottom: 0;
    color: $primary;
    position: absolute;
    width: 100%;

    svg {
      display: block;
      fill: $primary;
      transform: translateY(1px);
    }
  }

  .wave-extension {
    background-color: $primary;
    display: block;
    height: 10vh;
    width: 100%;
  }

  // Hide wave to not overflow the text
  @media screen and (max-height: 600px) {
      .wave {
        display: none;
      }
  }
</style>
