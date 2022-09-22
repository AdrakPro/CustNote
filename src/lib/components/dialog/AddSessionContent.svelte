<script lang="ts">
	import { sessions } from '$lib/stores/session.js';
	import { dialog } from '$lib/stores/dialog.js';
	import { onMount } from 'svelte';

	let timeInput: HTMLInputElement;

	// Default values for setting up sessions
	let includeBreaks = true;
	let time = 25;
	let breakTime = 5;
	let repeat = 4;
	let names = '';

	onMount(() => timeInput.focus());

	function submitTime({ keyCode }) {
		if (validateSubmit(keyCode)) {
			dialog.close();

			const namesArray = names.split(',');

			for (let i = 0; i < repeat; ++i) {
				let name = namesArray[i];

				// User didn't specify name
				if (name === undefined || name === '') {
					name = 'Not specified';
				}

				sessions.add(time, name);

				if (includeBreaks) {
					sessions.add(breakTime, 'break');
				}
			}
		}
	}

	function validateSubmit(keyCode) {
		// Enter
		return keyCode === 13;
	}
</script>

<div class="dialog">
	<label>
		Enter time (min):
		<input
			bind:value={ time }
			bind:this={ timeInput }
			max="60"
			min="1"
			name="time"
			type="number"
		/>
	</label>
	<label>
		Include breaks:
		<input
			bind:checked={ includeBreaks }
			name="breaks"
			type="checkbox"
		>
	</label>
	<label>
		Enter break time (min):
		<input
			bind:value={ breakTime }
			disabled="{ !includeBreaks }"
			max="60"
			min="1"
			name="breakTime"
			type="number"
		/>
	</label>
	<label>
		Repeat times:
		<input
			bind:value={ repeat }
			max="15"
			min="1"
			name="repeat"
			type="number"
		/>
	</label>
	<label>
		Session names:
		<input
			bind:value={ names }
			name="names"
			placeholder="Name, Name, ..."
			type="text"
		/>
	</label>
</div>

<svelte:window on:keydown={ (event) => submitTime(event) } />

<style lang="scss">
  .dialog {
    display: inline-block;

    label {
      align-items: center;
      display: flex;
      margin-bottom: $s-6;
    }

    h1 {
      font-weight: $fw-bold;
      margin-right: 10px;
    }

    // Yes button should be different than no (feature)
    button {
      border-radius: $base-radius;
      box-shadow: $base-shadow;
      cursor: pointer;
      margin: 0 $s-6;
      padding: 0 $s-6;
    }

    input {
      border-radius: $base-radius;
      margin-left: $s-6;
      max-width: 22%;
      padding: 0 $s-6;
      text-align: center;

      &[type='text'] {
        max-width: 50%;
      }
    }
  }
</style>