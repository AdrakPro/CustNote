<script>
  import Icon from '$lib/components/Icon.svelte';
  import { reviseMode } from '$lib/stores/reviseMode.js';

  function switchReviseMode() {
    reviseMode.set(!$reviseMode);
  }
</script>

<button
  class:active={$reviseMode}
  class:disabled={!$reviseMode}
  on:click={() => switchReviseMode()}
>
  <Icon name="event_available" />
  <span>Revise mode</span>
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

  // Todo mixins?
  .active {
    border-color: $blue;
    color: $blue;
    transition: all 250ms ease;
  }

  .disabled {
    border-color: $white;
    color: $white;
    transition: all 250ms ease;
  }
</style>
