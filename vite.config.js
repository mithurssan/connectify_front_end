import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import requireTransform from 'vite-plugin-require-transform';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		requireTransform({
			fileRegex: /.jsx?$/,
			importPrefix: '_vite_plugin_require_transform_',
			importPathHandler: (requireSpecifier) => {
				if (requireSpecifier === 'react-chat-engine') {
					return 'react-chat-engine/dist/index.js';
				}
				return requireSpecifier;
			},
		}),
	],
	test: {
		globals: true,
		environment: 'jsdom',
	},
});
