<script>
	import Drawer from '$lib/components/notes/Drawer.svelte';
	import { createEventDispatcher } from 'svelte';

	export let open = true;
	export let notes;

	const dispatch = createEventDispatcher();

	function selectNote(content) {
		dispatch('selectNote', { content });
	}
</script>

<Drawer { open }>
	<ul>
		{#each notes as { name, content }}
			<li on:click={ () => selectNote(content) }>
				<span>{ name }</span>
			</li>
		{/each}
	</ul>
</Drawer>


<style lang="scss">
  ul {
    height: 100%;
    list-style-type: none;
    margin-top: 60px;
    padding: $s-12;

    li {
      cursor: pointer;
      font-size: $fs-18;
      font-weight: $fw-bold;
      user-select: none;

      &::before {
        color: $blue;
        content: '»';
        font-size: $fs-24;
        margin-right: $s-6;
      }

      &:hover {
        opacity: $base-opacity;
        transition: opacity 250ms ease-in-out;
      }
    }
  }
</style>