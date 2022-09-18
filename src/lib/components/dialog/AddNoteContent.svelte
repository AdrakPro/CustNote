<script lang="ts">
	import { onMount } from 'svelte';
	import { notes } from '$lib/stores/notes.js';
	import { dialog } from '$lib/stores/dialog.js';
	import { notify } from '$lib/stores/notify.js';
	import { post } from '$lib/api.js';

	export let userId: string;
	export let moduleName: string;
	let nameInput: HTMLInputElement;

	onMount(() => nameInput.focus());

	async function submit({ keyCode }) {
		const name = nameInput.value;

		if (validateSubmit(keyCode, name)) {
			notes.addNote(moduleName, name);
			dialog.close();

			// Create a module in database
			const noteRes = await post(
				`/api/${userId}/module/${moduleName}/notes`,
				{ moduleName, name },
				userId,
			);

			if (!noteRes.ok) {
				notify.danger('Note cannot be saved! Try again!');
			}
		}
	}

	function validateSubmit(keyCode, name) {
		return keyCode === 13 && name !== '';
	}
</script>

<div class="dialog">
	<h1>Enter note name:</h1>
	<input
		bind:this={ nameInput }
		name="note"
		type="text"
	/>
</div>

<svelte:window on:keydown={ (event) => submit(event) } />

<style lang="scss">
  .dialog {
    align-items: center;
    display: flex;

    h1 {
      font-weight: $fw-bold;
      margin-right: 10px;
    }

    input {
      padding: 0 5px 0 5px;
      width: 200px;
    }
  }
</style>