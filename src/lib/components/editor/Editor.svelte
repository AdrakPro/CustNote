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

	const defaultValue = '';

	// TODO SOME OPTIMZATION NEED #1 load non need plugins after
	function createEditor(dom) {
		return Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, dom);
				ctx.set(defaultValueCtx, defaultValue);
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
	}
</script>

<div spellcheck="false" use:createEditor></div>