import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

const globalStylePath = './src/styles/global.scss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			prependData: `@import '${globalStylePath}';`,
		}
	}),

	kit: {
		adapter: adapter(),

		vite: {
			server: {
				fs: {
					allow: ['static']
				}
			}
		}
	},
};

export default config;
