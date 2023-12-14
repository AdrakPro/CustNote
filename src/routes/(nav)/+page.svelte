<script>
  import Wave from '$lib/components/Wave.svelte';
</script>

<section class="welcome">
  <div class="info">
    <h1 class="quote">
      A better way to write, share and organize your notes
    </h1>
    <p>
      Take your notes to the next level with a blazing fast
      speed and various customizing features
    </p>
    <button><a href="/auth">Get started now</a></button>
    <button><a href="#">See how CustNote works</a></button>
  </div>
  <Wave />
</section>

<style lang="scss">
  /* INFO PAGE*/
  .welcome {
    height: calc(100vh - 64px);
    position: relative;
  }

  .info {
    margin: 0;
    padding: $s-32 $s-12;
    text-align: center;
  }

  .quote {
    font-size: $fs-42;
    font-weight: $fw-semibold;
    letter-spacing: -0.008em;
    margin-bottom: $s-20;
  }

  p {
    font-size: $fs-18;
    margin-bottom: $s-20;
  }

  button {
    background-color: $blue;
    border-radius: $base-radius;
    height: 48px;
    margin: 0 $s-12;

    a {
      color: $white;
      font-weight: $fw-bold;
      padding: $s-12;
    }
  }
</style>
