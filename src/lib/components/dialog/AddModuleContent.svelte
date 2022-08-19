<script>
	import { onMount } from 'svelte';
	import { modules } from '$lib/stores/modules.js';
	import { dialog } from '$lib/stores/dialog.js';

	let nameInput;

	onMount(() => nameInput.focus());

	function submit(event) {
		if (event.keyCode === 13 && nameInput.value !== '') {
			modules.addModule(nameInput.value);
			dialog.close();
		}
	}
</script>

<div class="dialog">
	<h1>Enter module name:</h1>
	<input bind:this={ nameInput } name="module" type="text" />
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