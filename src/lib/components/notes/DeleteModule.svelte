<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { DELETE_MODULE, dialog } from '$lib/stores/dialog.js';

	export let userId: string;
	export let moduleName: string;

	function deleteModule() {
		dialog.show(DELETE_MODULE, { userId, moduleName });
	}
</script>

<button on:click={ () => deleteModule() }>
	<Icon name="delete" />
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