<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { dialog } from '$lib/stores/dialog.js';

	function addNote() {
		dialog.show();
	}
</script>

<button on:click={ () => addNote() }>
	<Icon name="note_add" />
</button>

<style lang="scss">
	button {
		align-items: center;
		cursor: pointer;
		background-color: transparent;
		color: $white;
		margin: 3px 0 0 $s-6;
	}
</style>