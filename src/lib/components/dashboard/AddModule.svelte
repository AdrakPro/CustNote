<script>
	import Icon from '../Icon.svelte';
	import { dialog } from '$lib/stores/dialog.js';

	function show() {
		dialog.show();
	}
</script>

<button on:click={ () => show() }>
	<Icon src="icons/plus.png" />
	<span>New note</span>
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
    margin-left: 1em;
    padding: 0 10px 0 10px;

    &:hover {
      animation: opacity ease-in-out 250ms;
      opacity: 0.8;
    }
  }
</style>
<!-- TODO mixin dla hovera, zmien navbara z component na slota  -->