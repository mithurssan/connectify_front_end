import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				include: [/react-chat-engine/], // Specify the package or files you want to transform
			},
		}),
	],
	test: {
		globals: true,
		environment: 'jsdom',
	},
});
