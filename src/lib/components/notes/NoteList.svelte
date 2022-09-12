<script lang="ts">
	import Drawer from '$lib/components/notes/Drawer.svelte';
	import { createEventDispatcher } from 'svelte';

	export let open = true;
	export let notes;
	let currentSelectedItem: HTMLElement;

	const dispatch = createEventDispatcher();

	// Experimental usage of id
	function selectNote(name, content) {
		dispatch('selectNote', { content });
		paintItem(name);
	}

	function paintItem(name) {
		if (currentSelectedItem) {
			currentSelectedItem.style.color = '#fff';
		}

		const selectedItem = document.getElementById(name);
		selectedItem.style.color = '#2492f9';
		selectedItem.style.transition = 'color 250ms ease-in 15ms';
		currentSelectedItem = selectedItem;
	}
</script>

<Drawer { open }>
	<ul>
		{#each notes as { name, content } (name)}
			<li
				id="{ name }"
				on:click={ () => selectNote(name, content) }
			>{ name }</li>
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