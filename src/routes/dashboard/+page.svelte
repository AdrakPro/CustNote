<script>
	import SearchBar from '$lib/components/dashboard/SearchBar.svelte';
	import Module from '$lib/components/dashboard/Module.svelte';
	import AddNote from '$lib/components/dashboard/AddNote.svelte';
</script>

<section class="container" style="margin: 1em">
	<SearchBar />
	<AddNote />
</section>
<section class="container">
	<Module />
</section>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    overflow-x: hidden;
  }
</style>