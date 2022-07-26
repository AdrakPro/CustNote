<script>
    import Wave from '$lib/components/Wave.svelte';
</script>

<section class="welcome">
  <div class="text">
      <h1 class="quote">A better way to write, share and organize your notes</h1>
      <p>Take your notes to the next level with a blazing fast speed and various customizing features</p>
      <button class="nav-button"><span>Get started now</span></button>
      <button class="nav-button"><span>See how CustNote works</span></button>
  </div>
  <Wave />
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
    font-weight: $fw-semibold;
    letter-spacing: -0.008em;
    margin-bottom: 0.7em;
  }

  p {
    font-size: 1.125rem;
    margin-bottom: 1em;
  }

  /* BUTTONS TODO STYLING */
  .nav-button {
    background-color: $blue;
    border: 1px solid transparent;
    border-radius: 5px;
    color: $white;
    display: inline-block;
    font-weight: $fw-bold;
    height: 3em;
    line-height: 3em;
    margin: 0 10px;
    position: relative;
    text-align: left;

      span {
        padding: 5px;
      }
  }
</style>
