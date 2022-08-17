<script context="module">
	export async function load({ fetch }) {
		const authRes = await fetch('/api/auth.json');

		if (!authRes.ok) {
			return { status: 302, redirect: '/auth' };
		}
	}
</script>

<script>
	import SearchBar from '$lib/components/notes/SearchBar.svelte';
	import Module from '$lib/components/notes/Module.svelte';
	import AddNote from '$lib/components/notes/AddNote.svelte';
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
	}
</style>