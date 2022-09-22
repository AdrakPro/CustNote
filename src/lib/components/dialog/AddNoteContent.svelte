<script lang="ts">
	import { onMount } from 'svelte';
	import { notes } from '$lib/stores/notes.js';
	import { dialog } from '$lib/stores/dialog.js';
	import { notify } from '$lib/stores/notify.js';
	import { post } from '$lib/api.js';

	let nameInput: HTMLInputElement;
	const { userId, moduleName } = dialog.get().data;

	onMount(() => nameInput.focus());

	async function submit({ keyCode }) {
		const name = nameInput.value;

		if (validateSubmit(keyCode, name)) {
			notes.addNote(moduleName, name);
			dialog.close();

			// Create a module in database
			const { ok } = await post(
				`/api/${userId}/module/${moduleName}/notes`,
				{ moduleName, name },
				userId,
			);

			if (!ok) {
				notify.danger('Note cannot be saved! Try again!');
			}
		}
	}

	function validateSubmit(keyCode, name) {
		return keyCode === 13 && name !== '';
	}
</script>

<div class="dialog">
	<label>
		Enter note name:
		<input
			bind:this={ nameInput }
			name="note"
			type="text"
		/>
	</label>
</div>

<svelte:window on:keydown={ (event) => submit(event) } />

<style lang="scss">
  .dialog {
    align-items: center;
    display: flex;

    input {
      padding: 0 $s-6 0 $s-6;
      max-width: 50%;
    }
  }
</style>