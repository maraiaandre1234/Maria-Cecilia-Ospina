import adapter from '@sveltejs/adapter-static';

const repoName = 'Maria-Cecilia-Ospina';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html'
		}),
		paths: {
			base: `/${repoName}`
		}
	}
};

export default config;
