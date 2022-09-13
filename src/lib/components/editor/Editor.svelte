<script lang="ts">
	import {
		defaultValueCtx,
		Editor,
		editorViewCtx,
		rootCtx,
		serializerCtx
	} from '@milkdown/core';
	import { gfm } from '@milkdown/preset-gfm';
	import { indent, indentPlugin } from '@milkdown/plugin-indent';
	import { clipboard } from '@milkdown/plugin-clipboard';
	import { cursor } from '@milkdown/plugin-cursor';
	import { math } from '@milkdown/plugin-math';
	import { history } from '@milkdown/plugin-history';
	import { slash } from '@milkdown/plugin-slash';
	import { trailing } from '@milkdown/plugin-trailing';

	import { theme } from './style/theme.ts';
	import { replaceAll } from '@milkdown/utils';

	import { notes } from '$lib/stores/notes.js';
	import { withPrevious } from 'svelte-previous';

	import 'katex/dist/katex.min.css';

	export let note;
	const [currentNote, previousNote] = withPrevious(note);

	$: $currentNote = note;

	function createEditor(dom, note) {
		const editorPromise = Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, dom);
				ctx.set(defaultValueCtx, note.content);
			})
			.use(theme)
			.use(gfm)
			.use(slash)
			.use(clipboard)
			.use(history)
			.use(cursor)
			.use(math)
			.use(indent.configure(indentPlugin, {
				type: 'tab',
				size: 4,
			}))
			.use(trailing)
			.create();

		return {
			update() {
				editorPromise.then((editor) => {
					// Get Markdown string
					const currentMarkdown = editor.action((ctx) => {
						const editorView = ctx.get(editorViewCtx);
						const serializer = ctx.get(serializerCtx);

						return serializer(editorView.state.doc);
					});

					// Save note content before rendering markdown
					if ($previousNote) {
						$notes
							.find((note) => note.name === $previousNote.name)
							.content = currentMarkdown;
					}

					// Render markdown
					editor.action(replaceAll($currentNote.content));
				});
			},

			destroy() {
				console.log('destroyed');
			},
		};
	}
</script>

<div spellcheck="false" use:createEditor={ $currentNote }></div>