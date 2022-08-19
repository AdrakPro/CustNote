<script lang="ts">
	export let width = 32;
	export let height = 32;
	export let style = '';
	export let src: string;
	export let onClick = () => {
	};

</script>

<img { height } { src } { style } { width } on:click={ onClick } alt="icon" />