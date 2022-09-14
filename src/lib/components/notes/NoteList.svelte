<script lang="ts">
	import Drawer from '$lib/components/notes/Drawer.svelte';
	import { createEventDispatcher } from 'svelte';
	import { notes } from '$lib/stores/notes.js';

	export let open = true;
	let currentSelectedItem: HTMLElement;

	const dispatch = createEventDispatcher();

	// Experimental usage of id
	function selectNote(note) {
		dispatch('selectNote', note);
		paintItem(note.name);
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
		{#each $notes as note (note.name)}
			<li
				id="{ note.name }"
				on:click={ () => selectNote(note) }
			>{ note.name }</li>
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