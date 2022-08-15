<script>
	import Notify from '$lib/components/Notify.svelte';
	import '../styles/global.scss';
</script>

<main>
  <Notify />
  <slot></slot>
</main>