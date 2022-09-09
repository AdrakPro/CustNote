<script>
	import { page } from '$app/stores';
	import NoteList from '$lib/components/notes/NoteList.svelte';
	import Editor from '$lib/components/editor/Editor.svelte';
	import Icon from '$lib/components/Icon.svelte';

	const { moduleName } = $page.data;
	let open = true;

	$: size = open ? '300px' : '0';

	function toggleDrawer({ keyCode }) {
		// Esc key
		if (keyCode === 27) {
			open = !open;
		}
	}
</script>

<div class="container">
	<section class="note-list" style="width: { size }">
		<span
			class="icon"
			class:hidden={ !open }
		><Icon
			height="48"
			src="/logo-smaller.png"
			width="180"
		/></span>
		<NoteList { open } />
	</section>
	<section class="editor">
		<Editor />
	</section>
</div>

<svelte:window on:keydown={ (event) => toggleDrawer(event) } />

<svelte:head>
	<title>CustNote | { moduleName }</title>
</svelte:head>

<style lang="scss">
  .container {
    display: grid;
    gap: 0 0;
    grid-template-areas:
    'note-list editor';
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
  }

  .note-list {
    display: flex;
    grid-area: note-list;
    height: 100%;
    justify-content: center;
  }

  .editor {
    grid-area: editor;
    word-break: break-word;
  }

  .icon {
    margin-top: $s-6;
    position: fixed;
  }

  .hidden {
    visibility: hidden;
  }
</style>
