<script>
	import { page } from '$app/stores';
	import NoteList from '$lib/components/notes/NoteList.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Editor from '$lib/components/editor/Editor.svelte';
	import { goto } from '$app/navigation';

	const { moduleName, notes } = $page.data;
	let open = true;
	let noteContent = '';

	$: size = open ? '300px' : '0';

	function toggleDrawer({ keyCode }) {
		// Esc key
		if (keyCode === 27) {
			open = !open;
		}
	}

	function selectNote({ detail }) {
		noteContent = detail.content;
	}

	function redirectToDashboard() {
		goto('/dashboard');
	}
</script>

<div class="container">
	<section class="note-list" style="width: { size }">
		<span
			class="icon"
			class:hidden={ !open }
			on:click={ () => redirectToDashboard() }
		><Icon
			height="48"
			src="/logo-smaller.png"
			width="180"
		/></span>
		<NoteList
			{ notes }
			{ open }
			on:selectNote={ selectNote }
		/>
	</section>
	<section class="editor">
		<Editor bind:content="{ noteContent }" />
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
    cursor: pointer;
    margin-top: $s-6;
    position: fixed;
    user-select: none;
    z-index: $max-z-index;
  }

  .hidden {
    visibility: hidden;
  }
</style>
