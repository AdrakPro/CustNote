<script>
	import NoteList from '$lib/components/notes/NoteList.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Editor from '$lib/components/editor/Editor.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { notes } from '$lib/stores/notes.js';
	import { put } from '$lib/api.js';
	import { onInterval } from '$lib/utils/timer.js';

	const { userId, moduleName } = $page.data;
	let open = true;
	let note = null;

	$: drawerSize = open ? '300px' : '0';

	// Interval to save notes to database
	// Now it's 5 minutes, because currently is personal use website, in future I would change that
	onInterval(async () => {
		const modifiedNotes = notes.getModifiedNotes();

		for (const note of modifiedNotes) {
			put(`/api/${ userId }/module/${ moduleName }/notes/${ note.name }.json`, { content: note.content }, userId);
		}
	}, 300_000);

	function toggleDrawer({ keyCode }) {
		// Esc key
		if (keyCode === 27) {
			open = !open;
		}
	}

	function selectNote({ detail }) {
		// Prevent user from selecting already selected note
		if (note !== detail) {
			note = detail;
		}
	}

	function redirectToDashboard() {
		goto('/dashboard');
	}
</script>

<div class="container">
	<section class="note-list" style="width: { drawerSize }">
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
			{ open }
			on:selectNote={ selectNote }
		/>
	</section>
	<!--	opcje, dodawnie, na samym dole drawera sticky-->
	<section class="editor">
		{#if note}
			<Editor bind:note="{ note }" />
		{/if}
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
    height: 100vh;
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
