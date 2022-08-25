<script>
	import SearchBar from '$lib/components/dashboard/SearchBar.svelte';
	import Module from '$lib/components/dashboard/Module.svelte';
	import AddModule from '$lib/components/dashboard/AddModule.svelte';
	import AddModuleContent from '$lib/components/dialog/AddModuleContent.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import { modules } from '$lib/stores/modules.js';
</script>

<section class="container" style="margin: 1rem">
	<SearchBar />
	<AddModule />
</section>
<section class="container">
	{#each $modules as { name, lastEdit }}
		<Module { name } { lastEdit } />
	{/each}
</section>
<Dialog>
	<AddModuleContent />
</Dialog>

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