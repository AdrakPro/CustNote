<script>
	import NoteList from '$lib/components/notes/NoteList.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Editor from '$lib/components/editor/Editor.svelte';
	import AddNote from '$lib/components/notes/AddNote.svelte';
	import DeleteModule from '$lib/components/notes/DeleteModule.svelte';
	import Dialog from '$lib/components/dialog/Dialog.svelte';
	import Notify from '$lib/components/Notify.svelte';
	import ReviseTracker from '$lib/components/notes/ReviseTracker.svelte';

	import { startNoteSavingInterval } from '$lib/utils/timer.js';
	import { redirectTo } from '$lib/utils/redirect.js';
	import { reviseMode } from '$lib/stores/reviseMode.js';
	import { dialog } from '$lib/stores/dialog.js';
	import { page } from '$app/stores';

	const { userId, moduleName } = $page.data;
	let open = true;
	let note = null;

	$: drawerSize = open ? '300px' : '0';

	// Interval to save notes to database
	// Now it's 5 minutes, because currently is personal use website, in future I would change that
	startNoteSavingInterval(userId, moduleName);

	function toggleDrawer({ keyCode }) {
		// Esc key
		if (keyCode === 27 && $dialog.name === '') {
			open = !open;
		}
	}

	function selectNote({ detail }) {
		// Prevent user from selecting already selected note
		if (note !== detail) {
			note = detail;
		}
	}

	async function redirectToDashboard() {
		await redirectTo('/dashboard');
	}
</script>

<div class="container">
	<section
		class="note-list"
		style="width: { drawerSize }"
	>
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
			{ moduleName }
			{ open }
			{ userId }
			on:selectNote={ selectNote }
		/>
	</section>
	<section
		class="utils"
		class:hidden={ !open }
	>
		<AddNote
			{ moduleName }
			{ userId }
		/>
		<DeleteModule
			{ moduleName }
			{ userId }
		/>
		{#if $reviseMode}
			<ReviseTracker { note } />
		{/if}
	</section>
	<section class="editor">
		<Editor bind:note="{ note }" />
	</section>
</div>
<Dialog />
<Notify />

<svelte:window on:keydown={ (event) => toggleDrawer(event) } />

<svelte:head>
	<title>CustNote | { moduleName }</title>
</svelte:head>

<style lang="scss">
  .container {
    display: grid;
    gap: 0 0;
    grid-template-areas:
    'note-list editor'
    'utils editor';
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr 40px;
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

  .utils {
    align-items: center;
    border-top: 3px $blue solid;
    box-shadow: $base-shadow;
    display: flex;
    grid-area: utils;
    z-index: $max-z-index;
  }

  .icon {
    cursor: pointer;
    margin-top: $s-6;
    position: fixed;
    user-select: none;
    z-index: $max-z-index;
  }

  .hidden {
    display: none;
  }
</style>
