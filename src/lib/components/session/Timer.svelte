<script>
	import { isComplete, isRunning, sessions, time, timer } from '$lib/stores/session.js';
	import { ADD_SESSION, dialog } from '$lib/stores/dialog.js';
	import ProgressBar from '$lib/components/session/ProgressBar.svelte';

	$: pauseText = $isRunning ? 'Pause' : 'Continue';
</script>

<div class="clock">{ $time }</div>
<ProgressBar />
<div class="buttons">
	{#if $isComplete}
		<button disabled="{ $sessions.length === 0 }" on:click={ () => timer.start() }>Start</button>
		<button on:click={ () => dialog.show(ADD_SESSION) }>Add sessions</button>
	{:else}
		<button on:click={ () => timer.switchPause() }>{ pauseText }</button>
		<button on:click={ () => timer.stop() }>Stop</button>
	{/if}
</div>

<style lang="scss">
  .clock {
    font-size: 64px;
    font-weight: $fw-bold;
    letter-spacing: 0.02em;
  }

  button {
    background-color: $blue;
    border-radius: $base-radius;
    box-shadow: $base-shadow;
    color: $white;
    cursor: pointer;
    height: 48px;
    margin: $s-12 $s-12 0;
    padding: $s-6;
    user-select: none;
    width: 120px;

    &:disabled {
      color: $gray;
      cursor: not-allowed;
    }
  }
</style>