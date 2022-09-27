<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { ADD_NOTE, dialog } from '$lib/stores/dialog.js';

	export let userId: string;
	export let moduleName: string;

	function addNote() {
		dialog.show(ADD_NOTE, { userId, moduleName });
	}
</script>

<button on:click={ () => addNote() }>
	<Icon name="note_add" />
</button>

<style lang="scss">
  button {
    align-items: center;
    background-color: transparent;
    color: $white;
    cursor: pointer;
    margin: 3px 0 0 $s-6;
    user-select: none;
  }
</style>