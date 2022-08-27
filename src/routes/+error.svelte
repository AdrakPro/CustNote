<script>
	import { page } from '$app/stores';
	// svelte-kit bug redirect causes error page
	console.log($page.error, $page.error.message);
</script>

<div class="container">
	<h1 class="title">Oops something went wrong with status code: { $page.error.status }</h1>
	<p class="home"><a href="/">Go back home</a></p>
	<img alt="gif" src="https://c.tenor.com/7tzqV8r23qoAAAAd/jd.gif" />
</div>

<style lang="scss">
  .container {
    text-align: center;
  }

  .title {
    font-size: $fs-32;
    font-weight: $fw-semibold;
    margin: $s-16 0 $s-16;
  }

  .home {
    font-size: $fs-24;
    margin-bottom: $s-16;

    a {
      color: $blue;
    }
  }
</style>