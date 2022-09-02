<script>
	import Editor from '$lib/components/editor/Editor.svelte';

	const title = 'Selected Note name';
</script>

<section class="note-list">

</section>
<section class="note-editor">
	<Editor />
</section>

<svelte:head>
	<title>{ title }</title>
		</svelte:head>