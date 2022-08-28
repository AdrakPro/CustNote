<script lang="ts">
	import { dialog } from '$lib/stores/dialog.js';
	import Icon from '$lib/components/Icon.svelte';

	function closeOnEscape(event) {
		if (event.keyCode === 27) {
			dialog.close();
		}
	}

	function close() {
		dialog.close();
	}
</script>

<svelte:window on:keydown={ (event) => closeOnEscape(event) } />

{#if $dialog}
	<div class="container">
		<Icon
			src="icons/close.png"
			style="cursor: pointer; float: right"
			onClick="{ () => close() }"
		/>
		<slot />
	</div>
{/if}

<style lang="scss">
  .container {
    background-color: $dark-blue;
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