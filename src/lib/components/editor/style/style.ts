import type { Emotion, ThemeManager } from '@milkdown/core';
import {
	ThemeBorder,
	ThemeFont,
	ThemeScrollbar,
	ThemeSize,
} from '@milkdown/core';
import { getPalette } from '@milkdown/design-system';
import { injectProsemirrorView } from '@milkdown/theme-pack-helper';

export const getStyle = (manager: ThemeManager, emotion: Emotion) => {
	const { injectGlobal, css } = emotion;
	const palette = getPalette(manager);

	const primary = palette('primary');
	const secondary = palette('secondary');
	const neutral = palette('neutral');
	const surface = palette('surface');
	const highlight = palette('line', 0.38);

	const lineWidth = manager.get(ThemeSize, 'lineWidth');
	const radius = manager.get(ThemeSize, 'radius');

	const fontCode = manager.get(ThemeFont, 'code');

	const selection = css`
		.ProseMirror-selectednode {
			outline: ${lineWidth} solid ${secondary};
		}

		li.ProseMirror-selectednode {
			outline: none;
		}

		li.ProseMirror-selectednode::after {
			${manager.get(ThemeBorder, undefined)};
		}

		&::selection {
			background: ${secondary};
		}
	`;

	const editorLayout = css`
		margin: 1rem;
		height: 100%;
		outline: none;

		& > * {
			margin: 1.625rem 0;
		}
	`;

	const blockquote = css`
		blockquote {
			border-left: 4px solid ${secondary};
			line-height: 28px;
			padding-left: 6px;
			margin-left: 0;
			margin-right: 0;

			* {
				line-height: 24px;
			}
		}
	`;

	const heading = css`
		h1 {
			color: ${secondary};
			font-size: 3rem;
			line-height: 1.167;
			text-align: center;
		}

		h2 {
			font-size: 2.5rem;
			line-height: 1.2;
		}

		h3 {
			font-size: 2.125rem;
			line-height: 1.05;
		}

		h4 {
			font-size: 1.75rem;
			line-height: 1.14;
		}

		h5 {
			font-size: 1.5rem;
			line-height: 1;
		}

		h6 {
			font-size: 1.25rem;
			line-height: 1;
		}

		.heading {
			margin: 1rem 0;
		}
	`;

	const hr = css`
		hr {
			background-color: ${primary};
			border-width: 0;
			height: ${lineWidth};
			outline: none;
		}
	`;

	const list = css`
		.ordered-list {
			counter-reset: custom-counter;
		}

		.list-item,
		.task-list-item {
			margin-top: 8px;
		}

		.list-item_label,
		.list-item .paragraph {
			margin: 0;
		}

		.list-item {
			display: flex;

			&_body {
				flex: 1;
				padding-left: 1px;
			}
		}

		.list-item_label {
			color: ${primary};
			display: flex;
			height: 24px;
			justify-content: center;
			line-height: 1.5;
			width: 24px;
		}

		.list-item[data-list-type='ordered'] {
			counter-increment: custom-counter;

			& > .list-item_label {
				font-size: 0;

				&::before {
					content: counter(custom-counter) ' )';
					font-size: 16px;
					font-weight: bold;
				}
			}
		}

		.list-item[data-list-type='bullet'] {
			& > .list-item_label {
				font-size: 24px;
				line-height: 1;
			}
		}

		.task-list-item {
			align-items: flex-start;
			display: flex;
			flex-direction: row;

			&_checkbox {
				height: 16px;
				margin: 8px 8px 8px 0;
			}

			& .paragraph {
				margin: 0;
			}
		}
	`;

	const code = css`
		.code-fence {
			background-color: ${surface};

			.code-fence_selector {
				font-size: 12px;
				height: 30px;
				width: 140px;
			}

			pre {
				background-color: ${surface};
				border-radius: ${radius};
				font-family: ${fontCode};
				margin: 0 18px;

				${manager.get(ThemeScrollbar, ['x'])}

				code {
					font-family: ${fontCode};
				}
			}
		}
	`;

	const img = css`
		.image-container {
			background-color: #333;
		}

		.image {
			display: inline-block;
			height: auto;
			margin: 0 auto;
			object-fit: contain;
			position: relative;
			text-align: center;
			width: 100%;
		}
	`;

	const inline = css`
		.code-inline {
			background-color: ${surface};
			border-radius: ${radius};
			font-family: ${fontCode};
			font-weight: 500;
			padding: 0 4px;
		}

		.strong {
			font-weight: bold;
			color: ${secondary};
		}

		em {
			font-style: italic;
		}

		.link,
		a {
			color: ${secondary};
			cursor: pointer;
			font-weight: 500;

			&:hover {
				text-decoration: underline;
			}
		}

		.strike-through {
			text-decoration-color: ${primary};
		}
	`;

	const footnote = css`
		.footnote-definition {
			border-radius: ${radius};
			display: flex;
			flex-direction: row;
			padding: 16px;

			${manager.get(ThemeBorder, undefined)};

			& > .footnote-definition_content {
				flex: 1;
				width: calc(100% - 16px);

				& > dd {
					margin-inline-start: 16px;
				}

				& > dt {
					color: ${secondary};
					font-weight: 500;
				}
			}

			& > .footnote-definition_anchor {
				width: 16px;
			}
		}
	`;

	const table = css`
		.tableWrapper {
			margin: 0;
			overflow-x: auto;
			width: 100%;

			${manager.get(ThemeScrollbar, ['x'])}
			* {
				box-sizing: border-box;
				font-size: 16px;
				margin: 0;
			}
		}

		table {
			border-collapse: collapse;
			border-radius: ${radius};
			overflow: auto;
			table-layout: fixed;
			width: 100%;

			p {
				line-height: 1.5;
				padding: 6px;
			}
		}

		tr {
			${manager.get(ThemeBorder, 'bottom')};
		}

		td,
		th {
			line-height: 3;
			height: 48px;
			min-width: 100px;
			padding: 0 16px;
			position: relative;
			text-align: left;
			vertical-align: middle;

			${manager.get(ThemeBorder, undefined)};
		}

		th {
			background: ${palette('primary', 0.5)};
			font-weight: 600;
			text-align: center !important;
		}

		.column-resize-handle {
			background: ${neutral};
			bottom: 0;
			position: absolute;
			pointer-events: none;
			right: -2px;
			top: 0;
			width: ${lineWidth};
			z-index: 20;
		}

		.selectedCell {
			&::after {
				background: ${highlight};
				bottom: 0;
				content: '';
				left: 0;
				position: absolute;
				right: 0;
				top: 0;
				pointer-events: none;
				z-index: 2;
			}

			&::selection {
				background: transparent;
			}
		}
	`;

	injectProsemirrorView(emotion);

	injectGlobal`
    .milkdown {
      .material-icons-outlined {
        font-size: 24px;
      }

      background: transparent;
      position: relative;
      margin: 0 auto 0 auto;
      height: 100%;

      ${manager.get(ThemeScrollbar, undefined)}
      ${selection};

      .resize-cursor {
        cursor: ew-resize;
        cursor: col-resize;
      }

      .editor {
        ${editorLayout};
				
        ${blockquote};
        ${hr};
        ${list};
        ${code};
        ${img};
        ${heading};

        ${table};
        ${footnote};

        ${inline};
      }
    }
	`;
};
