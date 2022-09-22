<script lang="ts">
	import { ADD_MODULE, ADD_NOTE, ADD_SESSION, DELETE_MODULE, dialog } from '$lib/stores/dialog.js';
	import Icon from '$lib/components/Icon.svelte';
	import AddNoteContent from './AddNoteContent.svelte';
	import AddModuleContent from './AddModuleContent.svelte';
	import DeleteModuleContent from './DeleteModuleContent.svelte';
	import AddSessionContent from './AddSessionContent.svelte';

	function closeOnEscape({ keyCode }) {
		if (keyCode === 27) {
			dialog.close();
		}
	}

	function close() {
		dialog.close();
	}

	async function loadContent() {
		let component;

		switch ($dialog.name) {
			case ADD_MODULE:
				component = AddModuleContent;
				break;
			case ADD_NOTE:
				component = AddNoteContent;
				break;
			case DELETE_MODULE:
				component = DeleteModuleContent;
				break;
			case ADD_SESSION:
				component = AddSessionContent;
				break;
		}

		return component;
	}
</script>

<svelte:window on:keydown={ (event) => closeOnEscape(event) } />

{#if $dialog.show}
	<div class="container">
		<Icon
			name="close"
			style="cursor: pointer; float: right"
			onClick="{ () => close() }"
		/>
		{#await loadContent() then component}
			<svelte:component this="{ component }" />
		{/await}
	</div>
{/if}

<style lang="scss">
  .container {
    background-color: $blue;
    border-top-left-radius: $base-radius;
    border-top-right-radius: $base-radius;
    bottom: 0;
    box-shadow: $base-shadow;
    left: 0;
    margin: 0 auto;
    padding: 1rem;
    position: absolute;
    right: 0;
    width: 450px;
    z-index: $max-z-index;
  }
</style>