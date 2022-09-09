<script>
	import Drawer from '$lib/components/notes/Drawer.svelte';
	import NoteItem from '$lib/components/notes/NoteItem.svelte';

	export let open = true;
	const notes = [];
</script>

<Drawer { open }>
	<ul>
		{#each notes as { name }}
			<NoteItem { name } />
		{/each}
	</ul>
</Drawer>


<style lang="scss">
  ul {
    list-style-type: none;
    margin-top: 60px;
    height: 100%;
    padding: $s-12;
  }
</style>