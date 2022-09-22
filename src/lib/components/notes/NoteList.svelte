<script lang="ts">
	import Drawer from '$lib/components/notes/Drawer.svelte';
	import { createEventDispatcher } from 'svelte';
	import { notes as noteStore } from '$lib/stores/notes.js';
	import { notify } from '$lib/stores/notify.js';
	import { del } from '$lib/api.js';

	export let open = true;
	export let moduleName: string;
	export let userId: string;


	let selectionIndex = 0;
	let currentSelectedItem: HTMLElement;
	let noteList: HTMLElement;

	const dispatch = createEventDispatcher();

	// Get notes that belong to module
	$: notes = $noteStore.filter((note) => note.moduleName === moduleName);

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

	async function deleteNote({ ctrlKey }, name) {
		if (ctrlKey) {
			noteStore.delete(name);

			const { ok } = del(`/api/${userId}/module/${moduleName}/notes/${name}.json`, userId);

			if (!ok) {
				notify.danger('Note cannot be deleted! Try again.');
			}
		}
	}
</script>

<Drawer { open }>
	<ul bind:this={ noteList }>
		{#each notes as note, i (note.name)}
			<li
				id="{ i }"
				tabindex="{ i + 1 }"
				on:click={ () => selectNote(note, i) }
				on:keydown={ (event) => selectNoteWithSpace(event, note, i) }
				on:contextmenu|preventDefault={(event) => deleteNote(event, note.name) }
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
			font-size: $fs-20;
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