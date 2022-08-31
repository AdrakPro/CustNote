<script>
	import { page } from '$app/stores';

	console.log($page.error);
</script>

<div class="container">
	<h1 class="error">{ $page.status } : { $page.error.message }</h1>
	<img
		src="https://c.tenor.com/7tzqV8r23qoAAAAd/jd.gif"
		alt="dancing monster"
	/>
</div>

<style lang="scss">
  .container {
    height: 100vh;
    display: grid;
    gap: $s-32;
    place-content: center;
    place-items: center;

    .error {
      font-size: $fs-42;
      font-weight: $fw-semibold;
    }

    img {
      border-radius: $base-radius;
      object-fit: cover;
    }
  }
</style>