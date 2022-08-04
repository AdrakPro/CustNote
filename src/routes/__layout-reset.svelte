<script>
	import Notify from '$lib/components/notifications/Notify.svelte';
	import '../styles/global.scss';
</script>

<main>
  <Notify />
  <slot></slot>
</main>