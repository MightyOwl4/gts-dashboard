import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    test: {
        environment: 'node',
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
        passWithNoTests: true
    },
    resolve: {
        alias: {
            '@renderer': resolve(__dirname, 'src/renderer/src'),
            '@main': resolve(__dirname, 'src/main'),
            '@preload': resolve(__dirname, 'src/preload'),
            '@shared': resolve(__dirname, 'src/shared')
        }
    }
});
