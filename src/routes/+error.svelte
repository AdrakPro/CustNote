<script>
	import { page } from '$app/stores';
	// svelte bug wait to repair ( error page override redirect )
</script>

<div class="container">
	<h1 class="title">Opss something went wrong with status code: { $page.status }</h1>
	<p class="home"><a href="/">Go back home</a></p>
	<img alt="gif" src="https://c.tenor.com/7tzqV8r23qoAAAAd/jd.gif" />
</div>

<style lang="scss">
  .container {
    text-align: center;
  }

  .title {
    font-size: 2rem;
    font-weight: $fw-semibold;
    margin-bottom: 1em;
  }

  .home {
    font-size: 1.5rem;
    margin-bottom: 1em;

    a {
      color: $blue;
      text-decoration: none;
    }
  }
</style>