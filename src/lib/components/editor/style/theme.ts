import {
	hex2rgb,
	ThemeBorder,
	ThemeColor,
	themeFactory,
	ThemeFont,
	ThemeGlobal,
	ThemeIcon,
	ThemeScrollbar,
	ThemeShadow,
	ThemeSize,
} from '@milkdown/core';
import { useAllPresetRenderer } from '@milkdown/theme-pack-helper';
import { color } from './color';
import { getStyle } from './style';
import { getIcon } from './icon';

export const theme = themeFactory((emotion, manager) => {
	const { css } = emotion;

	manager.set(ThemeColor, (options) => {
		if (!options) {
			return;
		}

		const [key, opacity] = options;
		const hex = color[key];
		const rgb = hex2rgb(hex);

		if (!rgb) {
			return;
		}

		return `rgba(${rgb.join(', ')}, ${opacity || 1})`;
	});

	manager.set(ThemeSize, (key) => {
		const size = {
			radius: '5px',
			lineWidth: '2px',
		};

		if (!key) {
			return;
		}

		return size[key];
	});

	manager.set(ThemeFont, (key) => {
		const font = {
			typography: 'Arimo, sans-serif',
			code: 'Noto Sans, sans-serif',
		};

		if (!key) {
			return;
		}

		return font[key];
	});

	manager.set(
		ThemeScrollbar,
		([direction = 'y', type = 'normal'] = ['y', 'normal'] as never) => {
			const main = manager.get(ThemeColor, ['primary']);

			const scrollbar = css({
				'&::-webkit-scrollbar': {
					[direction === 'y' ? 'width' : 'height']: `${
						type === 'thin' ? 2 : 12
					}px`,
					backgroundColor: 'transparent',
				},
			});

			return css`
				scrollbar-width: thin;
				scrollbar-color: ${main} transparent;

				${scrollbar};

				&::-webkit-scrollbar-track {
					border-radius: 999px;
					background: transparent;
					border: 4px solid transparent;
				}

				&::-webkit-scrollbar-thumb {
					border-radius: 999px;
					background-color: ${main};
					border: ${type === 'thin' ? 0 : 4}px solid transparent;
					background-clip: content-box;
				}

				&::-webkit-scrollbar-thumb:hover {
					background-color: ${main};
				}
			`;
		},
	);

	manager.set(ThemeShadow, () => {
		const lineWidth = manager.get(ThemeSize, 'lineWidth');
		const getShadow = (opacity: number) =>
			manager.get(ThemeColor, ['shadow', opacity]);

		return css`
			box-shadow: 0 ${lineWidth} ${lineWidth} ${getShadow(0.14)},
				0 2px ${lineWidth} ${getShadow(0.12)},
				0 ${lineWidth} 3px ${getShadow(0.2)};
		`;
	});

	manager.set(ThemeBorder, (direction) => {
		const lineWidth = manager.get(ThemeSize, 'lineWidth');
		const line = manager.get(ThemeColor, ['line']);
		const primary = manager.get(ThemeColor, ['primary']);

		if (!direction) {
			return css`
				border: ${lineWidth} ${primary} solid;
			`;
		}

		return css`
      broder-${direction}: ${lineWidth} ${line} solid;
		`;
	});

	manager.set(ThemeIcon, (icon) => {
		if (!icon) {
			return;
		}

		return getIcon(icon);
	});

	manager.set(ThemeGlobal, () => getStyle(manager, emotion));

	useAllPresetRenderer(manager, emotion);
});
