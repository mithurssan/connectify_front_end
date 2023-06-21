import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from '@rollup/plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
	},
	build: {
		rollupOptions: {
			plugins: [
				babel({
					babelHelpers: 'bundled',
					include: /node_modules/,
				}),
			],
		},
	},
});
