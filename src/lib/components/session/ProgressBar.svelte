<script>
	import { onMount } from 'svelte';
	import { progress } from '$lib/stores/session.js';

	let progressBar;

	// Progressbar.js is not ssr compatible, so I needed to use this
	onMount(async () => {
		const { Line } = (await import('progressbar.js')).default;

		progressBar = new Line('#progress-bar', {
			strokeWidth: 1.5,
			trailColor: '#fff',
			duration: 1200,
			easing: 'easeOut',

			svgStyle: {
				'border-radius': '999px',
				display: 'block',
				'margin-left': '10%',
				width: '80%',
			},

			from: { color: '#1088f9' },
			to: { color: '#7838d6' },
			step: (state, line) => {
				line.path.setAttribute('stroke', state.color);
			},
		});
	});

	$: progressBar?.animate($progress);
</script>

<div id="progress-bar"></div>
