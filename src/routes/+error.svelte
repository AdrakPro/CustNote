<script>
  import { page } from '$app/stores';

  console.log($page.error);
</script>

<div class="container">
  <h1 class="error">
    {$page.status} : {$page.error.message}
  </h1>
</div>

<style lang="scss">
  .container {
    display: grid;
    gap: $s-32;
    height: 100vh;
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
