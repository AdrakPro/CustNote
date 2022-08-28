<script lang="ts">
	export let width = 24;
	export let height = 24;
	export let src: string;
	export let onClick = () => {};
</script>

<img
	{ src }
	{ width }
	{ height }
	style="{ $$props.style }"
	on:click={ onClick }
	alt="icon"
/>