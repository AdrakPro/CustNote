<script lang="ts">
	import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
	import { commonmark } from '@milkdown/preset-commonmark';
	import { nord } from '@milkdown/theme-nord';

	export let defaultValue: string;

	function editor(dom) {
		Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, dom);
				ctx.set(defaultValueCtx, defaultValue);
			})
			.use(nord)
			.use(commonmark)
			.create();
	}
</script>

<style></style>

<div use:editor></div>