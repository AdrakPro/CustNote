<script>
  import Wave from '$lib/utils/Wave.svelte'

</script>

<div class="container">

  <div class="wave">
    <Wave position="relative" thickness="45" />
  </div>
</div>

<style lang="scss">
  .container {
    height: 100vh;
    overflow: hidden;
  }

  .wave {
    overflow-x: hidden;
    transform: rotate(20deg) translateY(450px) translateX(-120px);
    width: 160vw;
  }
// wycentruj tak samo nav liste
  .login-form {
    background-color: transparent;
    height: 600px;
    left: 50%;
    margin-left: -200px;
    margin-top: -300px;
    position: fixed;
    top: 50%;
    width: 400px;
    z-index: 100;
  }
</style>