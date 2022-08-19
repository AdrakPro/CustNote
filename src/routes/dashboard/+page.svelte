<script>
	import SearchBar from '$lib/components/dashboard/SearchBar.svelte';
	import Module from '$lib/components/dashboard/Module.svelte';
	import AddModule from '$lib/components/dashboard/AddModule.svelte';
	import AddModuleContent from '$lib/components/dialog/AddModuleContent.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
</script>

<section class="container" style="margin: 1em">
	<SearchBar />
	<AddModule />
</section>
<section class="container">
	<Module />
</section>
<Dialog>
	<AddModuleContent />
</Dialog>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    overflow-x: hidden;
  }
</style>