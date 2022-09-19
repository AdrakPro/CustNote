<script>
	import SearchBar from '$lib/components/dashboard/SearchBar.svelte';
	import AddModule from '$lib/components/dashboard/AddModule.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import Notify from '$lib/components/Notify.svelte';
	import ModuleList from '$lib/components/dashboard/ModuleList.svelte';
	import { page } from '$app/stores';

	const { userId } = $page.data;
</script>

<Notify />
<section
	class="container"
	style="margin: 1rem"
>
	<SearchBar />
	<AddModule { userId } />
</section>
<section class="container">
	<ModuleList />
</section>
<Dialog />

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