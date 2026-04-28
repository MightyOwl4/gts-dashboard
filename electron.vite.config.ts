import { resolve } from 'node:path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()],
        resolve: {
            alias: {
                '@main': resolve(__dirname, 'src/main'),
                '@shared': resolve(__dirname, 'src/shared')
            }
        },
        build: {
            rollupOptions: {
                output: {
                    format: 'cjs',
                    entryFileNames: '[name].cjs',
                    chunkFileNames: '[name]-[hash].cjs'
                }
            }
        }
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
        resolve: {
            alias: {
                '@preload': resolve(__dirname, 'src/preload'),
                '@shared': resolve(__dirname, 'src/shared')
            }
        },
        build: {
            rollupOptions: {
                output: {
                    format: 'cjs',
                    entryFileNames: '[name].cjs',
                    chunkFileNames: '[name]-[hash].cjs'
                }
            }
        }
    },
    renderer: {
        root: resolve(__dirname, 'src/renderer'),
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                '@renderer': resolve(__dirname, 'src/renderer/src'),
                '@shared': resolve(__dirname, 'src/shared')
            }
        },
        server: {
            host: '0.0.0.0',
            port: 5173,
            strictPort: true,
            watch: {
                usePolling: true,
                interval: 200
            }
        },
        build: {
            rollupOptions: {
                input: resolve(__dirname, 'src/renderer/index.html')
            }
        }
    }
});
