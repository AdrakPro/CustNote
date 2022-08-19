<script>
	import Wave from '$lib/components/Wave.svelte';
</script>

<section class="welcome">
	<div class="info">
		<h1 class="quote">A better way to write, share and organize your notes</h1>
		<p>Take your notes to the next level with a blazing fast speed and various customizing features</p>
		<button class="nav-button"><a href="/auth">Get started now</a></button>
		<button class="nav-button"><a href="#">See how CustNote works</a></button>
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

  .nav-button {
    background-color: $blue;
    border-radius: $base-radius;
    height: 48px;
    margin: 0 10px;

    a {
      color: $white;
      font-weight: $fw-bold;
      padding: 5px;
      text-decoration: none;
    }
  }
</style>
