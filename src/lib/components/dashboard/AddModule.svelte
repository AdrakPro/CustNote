<script>
	import { dialog } from '$lib/stores/dialog.js';
	import Icon from '../Icon.svelte';

	function show() {
		dialog.show();
	}
</script>

<button on:click={ () => show() }>
	<Icon name="add" />
	<span>New module</span>
</button>

<style lang="scss">
  button {
    align-items: center;
    background-color: transparent;
    border: 3px $white solid;
    border-radius: $base-radius;
    box-shadow: $base-shadow;
    color: $white;
    cursor: pointer;
    display: flex;
    margin-left: 1rem;
    padding: 0 $s-12 0 $s-12;

    &:hover {
      animation: opacity ease-in-out 250ms;
      opacity: $base-opacity;
    }
  }
</style>
