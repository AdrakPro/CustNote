<script>

</script>

<div class="welcome-page">
    <div class="info">
        <h1 class="quote">A better way to write, organize and share your notes</h1>
        <p>Take your notes to the next level with a blazing fast speed and various customizing features</p>
        <button>Get started now</button>
        <button>See how CustNote works</button>
    </div>
    <div class="wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#46BDDF" fill-opacity="0.95" d="M0,64L48,90.7C96,117,192,171,288,160C384,149,480,75,576,64C672,53,768,107,864,117.3C960,128,1056,96,1152,101.3C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <div class="wave-extension"></div>
    </div>
</div>

<style lang="scss">
  .welcome-page {
    position: relative;
    height: calc(89vh - 1px);
  }

  .info {
    text-align: center;
    margin-top: 2rem;
  }

  .quote {
    font-weight: 600;
    font-size: 44px;
    letter-spacing: -.008em;
    margin-bottom: 20px;
  }

  p {
    font-size: 18px;
    margin-bottom: 24px;
  }

  /* WAVE */
  .wave {
    position: absolute;
    width: 100%;
    bottom: 0;
    color: #46BDDF;

    svg {
      display: block;
      transform: translateY(1px);
    }
  }

  .wave-extension {
    width: 100%;
    height: 12vh;
    background-color: #46BDDF;
    opacity: 0.95;
  }
</style>
