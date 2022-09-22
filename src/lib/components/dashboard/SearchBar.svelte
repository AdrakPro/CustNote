<script>
	import Icon from '../Icon.svelte';

	export let searchedText = '';
</script>

<div class="search-bar">
	<Icon
		name="search"
		style="margin-left: 5px"
	/>
	<input
		bind:value={ searchedText }
		name="search"
		placeholder="Search..."
		type="text"
	/>
</div>

<style lang="scss">
  .search-bar {
    align-items: center;
    border: 3px $white solid;
    border-radius: $base-radius;
    box-shadow: $base-shadow;
    display: flex;

    &:hover {
      animation: border-color ease-in-out 250ms;
      border-color: rgba($white, 0.8);
    }

    input[type='text'] {
      background: transparent;
      color: $white;
      height: 40px;
      width: 45vw;
    }
  }
</style>