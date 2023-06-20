import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import requireTransform from 'vite-plugin-require-transform';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		requireTransform({
			transforms: [
				{
					test: /react-chat-engine/,
					transform: 'react-chat-engine/esm',
				},
			],
		}),
	],
	test: {
		globals: true,
		environment: 'jsdom',
	},
});
