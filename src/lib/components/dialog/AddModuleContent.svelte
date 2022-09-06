<script lang="ts">
	import { onMount } from 'svelte';
	import { modules } from '$lib/stores/modules.js';
	import { dialog } from '$lib/stores/dialog.js';
	import { page } from '$app/stores';
	import { notify } from '$lib/stores/notify.js';
	import { post } from '$lib/api.js';

	const { userId } = $page.data;
	let nameInput: HTMLInputElement;

	onMount(() => nameInput.focus());

	async function submit({ keyCode }) {
		const name = nameInput.value;

		if (keyCode === 13 && name !== '') {
			modules.addModule(name);
			dialog.close();

			// Create a module in database
			const moduleRes = await post(`api/${userId}/module.json`, { name, userId }, userId);

			if (!moduleRes.ok) {
				notify.danger('Module cannot be saved! Try again!');
			}
		}
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