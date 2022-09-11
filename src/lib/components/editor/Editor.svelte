<script lang="ts">
	import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
	import { gfm } from '@milkdown/preset-gfm';
	import { indent, indentPlugin } from '@milkdown/plugin-indent';
	import { clipboard } from '@milkdown/plugin-clipboard';
	import { cursor } from '@milkdown/plugin-cursor';
	import { math } from '@milkdown/plugin-math';
	import { history } from '@milkdown/plugin-history';
	import { slash } from '@milkdown/plugin-slash';

	import { theme } from './style/theme.ts';
	import 'katex/dist/katex.min.css';
	import { insert } from '@milkdown/utils';

	export let content: string;

	// const getMarkdown = () =>
	// 	editor.action((ctx) => {
	// 		const editorView = ctx.get(editorViewCtx);
	// 		const serializer = ctx.get(serializerCtx);
	// 		return serializer(editorView.state.doc);
	// 	});

	// TODO SOME OPTIMZATION NEED #1 load non need plugins after
	function createEditor(dom, content) {
		const editor = Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, dom);
				ctx.set(defaultValueCtx, content);
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
			.create();
		//	https://svelte.dev/docs#template-syntax-element-directives-use-action
		return {
			update(content) {
				editor.then((editor) => editor.action(insert(content)));
			},
		};
	}
</script>

<div spellcheck="false" use:createEditor={ content }></div>