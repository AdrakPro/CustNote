import { sveltekit } from '@sveltejs/kit/vite';
import path from 'node:path';

/** @type { import('vite').UserConfig } */
const config = {
	plugins: [sveltekit()],

	resolve: {
		alias: {
			$styles: path.resolve(__dirname, './src/styles/shared'),
		},
	},

	server: {
		fs: {
			allow: ['static'],
		},
	},
};

export default config;
