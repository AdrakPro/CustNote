<script>
	import SearchBar from '$lib/components/dashboard/SearchBar.svelte';
	import AddModule from '$lib/components/dashboard/AddModule.svelte';
	import AddModuleContent from '$lib/components/dialog/AddModuleContent.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import Notify from '$lib/components/Notify.svelte';
	import ModuleList from '$lib/components/dashboard/ModuleList.svelte';
</script>

<Notify />
<section
	class="container"
	style="margin: 1rem"
>
	<SearchBar />
	<AddModule />
</section>
<section class="container">
	<ModuleList />
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