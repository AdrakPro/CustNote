<script>
	import { getDifferenceInDays } from '$lib/utils/date.js';

	export let note;
	$: isReviseNotDone = note?.reviseCount <= 3;

	$: days = getDifferenceInDays(new Date(note?.reviseDeadline));

	$: getColor = () => {
		let color;

		if (days >= 4) {
			color = '#2492f9';
		} else if (days <= 3) {
			color = '#a82ffc';
		}

		// Override value if true
		if (days <= 1) {
			color = '#e95065';
		}

		return color;
	}
</script>

<!--Todo manage text when its one day left-->
{#if isReviseNotDone}
	<div
		class="container"
		style="color: { getColor() }"
	>{ days } days left to revise!
	</div>
{/if}

<style lang="scss">
  .container {
    font-weight: $fw-bold;
    margin: 0 $s-12 0 auto;
    padding: 3px;
    user-select: none;
  }
</style>