<script lang="ts">
	import { onMount } from 'svelte';
	import { modules } from '$lib/stores/modules.js';
	import { dialog } from '$lib/stores/dialog.js';
	import { notify } from '$lib/stores/notify.js';
	import { post } from '$lib/api.js';

	let nameInput: HTMLInputElement;
	const { userId } = dialog.get().data;

	onMount(() => nameInput.focus());

	async function submit({ keyCode }) {
		const name = nameInput.value;

		if (validateSubmit(keyCode, name)) {
			modules.add(name);
			dialog.close();

			// Create a module in database
			const { ok } = await post(`/api/${userId}/module`, { name, userId }, userId);

			if (!ok) {
				notify.danger('Module cannot be saved! Try again!');
			}
		}
	}

	function validateSubmit(keyCode, name) {
		return keyCode === 13 && name !== '';
	}
</script>

<div class="dialog">
	<h1>Enter module name:</h1>
	<input
		bind:this={ nameInput }
		name="module"
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