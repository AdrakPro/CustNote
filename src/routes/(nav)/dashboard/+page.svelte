<script>
  import SearchBar from '$lib/components/dashboard/SearchBar.svelte';
  import AddModule from '$lib/components/dashboard/AddModule.svelte';
  import ModuleList from '$lib/components/dashboard/ModuleList.svelte';
  import ReviseMode from '$lib/components/dashboard/ReviseMode.svelte';
  import { page } from '$app/stores';

  const { userId } = $page.data;
</script>

<section class="container" style="margin: 1rem">
  <SearchBar />
  <AddModule {userId} />
  <ReviseMode />
</section>
<section class="container">
  <ModuleList />
</section>

<svelte:head>
  <title>CustNote | Dashboard</title>
</svelte:head>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    overflow-x: hidden;
  }
</style>
