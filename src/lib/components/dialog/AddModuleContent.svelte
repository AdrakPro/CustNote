<script>
	import { onMount } from 'svelte';
	import { modules } from '$lib/stores/modules.js';
	import { dialog } from '$lib/stores/dialog.js';
	import { page } from '$app/stores';
	import { notify } from '$lib/stores/notify.js';

	const { userId } = $page.data;
	let nameInput;

	onMount(() => nameInput.focus());

	async function submit(event) {
		const name = nameInput.value;

		if (event.keyCode === 13 && name !== '') {
			modules.addModule(name);
			dialog.close();

			// Create a module in database
			const newModuleRes = await fetch('/api/modules/new-module.json', {
				method: 'POST',
				headers: new Headers({ 'content-type': 'application/json' }),
				credentials: 'same-origin',
				body: JSON.stringify({ name, userId }),
			});

			if (!newModuleRes.ok) {
				notify.danger('Module cannot be saved! Try again!');
			}
		}
	}
</script>

<div class="dialog">
	<h1>Enter module name:</h1>
	<input
		bind:this={ nameInput }
		type="text"
		name="module"
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