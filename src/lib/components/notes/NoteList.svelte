<script lang="ts">
	import Drawer from '$lib/components/notes/Drawer.svelte';
	import { createEventDispatcher } from 'svelte';
	import { notes as noteStore } from '$lib/stores/notes.js';

	export let open = true;
	export let moduleName;

	let selectionIndex = 0;
	let currentSelectedItem: HTMLElement;
	let noteList: HTMLElement;

	const dispatch = createEventDispatcher();

	$: notes = noteStore.get(moduleName);

	// Experimental usage of id
	function selectNote(note, index) {
		if (note) {
			dispatch('selectNote', note);
			paintItem(index);
		}
	}

	function paintItem(index) {
		if (currentSelectedItem) {
			currentSelectedItem.style.color = '#fff';
		}

		const selectedItem = document.getElementById(index);
		selectedItem.style.color = '#2492f9';
		selectedItem.style.transition = 'color 250ms ease-in 15ms';
		currentSelectedItem = selectedItem;
	}

	function selectNoteWithSpace({ keyCode }, note, index) {
		if (keyCode === 32) {
			selectNote(note, index);
		}
	}

	function selectNextNote(event) {
		if (event.altKey && event.keyCode === 40) {
			noteList.focus();

			++selectionIndex;

			if (selectionIndex >= notes.length) {
				selectionIndex = 0;
			}

			selectNote(notes[selectionIndex], selectionIndex);
		}
	}

	// Prevent spamming
	function selectPreviousNote(event) {
		if (event.altKey && event.keyCode === 38) {
			noteList.focus();
			--selectionIndex;

			if (selectionIndex === -1) {
				selectionIndex = notes.length - 1;
			}

			selectNote(notes[selectionIndex], selectionIndex);
		}
	}
</script>

<Drawer { open }>
	<ul bind:this={ noteList }>
		{#each notes as note, i}
			<li
				id="{ i }"
				tabindex="{ i + 1 }"
				on:click={ () => selectNote(note, i) }
				on:keydown={ (event) => {
					selectNoteWithSpace(event, note, i);
				} }
			>{ note.name }</li>
		{/each}
	</ul>
</Drawer>

<svelte:window on:keydown={ (event) => {
	selectNextNote(event);
	selectPreviousNote(event);
}} />

<style lang="scss">
  ul {
    height: 100%;
    list-style-type: none;
    margin-top: 60px;
    padding: $s-12;

    li {
      cursor: pointer;
      font-weight: $fw-bold;
      user-select: none;

      &::before {
        color: $blue;
        content: '»';
        font-size: $fs-20;
        margin-right: $s-6;
      }

      &:hover {
        opacity: $base-opacity;
        transition: opacity 250ms ease-in-out;
      }
    }
  }
</style>