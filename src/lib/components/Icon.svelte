<script lang="ts">
	export let width = 32;
	export let height = 32;
	export let src: string;
	export let onClick = () => {
	};

</script>

<img { height } { src } { width } style="{ $$props.style }" on:click={ onClick } alt="icon" />