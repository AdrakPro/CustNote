import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

const globalVariables = './src/styles/global_variables.scss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			prependData: `@import '${globalVariables}';`,
		},
	}),

	kit: {
		adapter: adapter(),
	},

	csp: {
		mode: 'hash',
		directives: {
			'script-src': ['self'],
			'img-src': ['*'],
		},
	},

	csrf: {
		checkOrigin: true,
	},
};

export default config;
