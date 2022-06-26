<script>

</script>
<div class="wave">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#46BDDF" fill-opacity="0.95" d="M0,64L48,90.7C96,117,192,171,288,160C384,149,480,75,576,64C672,53,768,107,864,117.3C960,128,1056,96,1152,101.3C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
    <div class="wave-extension"></div>
</div>

<style lang="scss">
  /* Wave */

  .wave {
    position: fixed;
    width: 100vw;
    bottom: 0;
    color: #46BDDF;

    svg {
      display: block;
    }
  }

  .wave-extension {
    width: 100%;
    height: 10vh;
    background-color: #46BDDF;
    opacity: 0.95;
  }
</style>
