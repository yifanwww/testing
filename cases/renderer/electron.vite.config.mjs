import { defineConfig } from 'electron-vite';

export default defineConfig({
  main: {
    build: {
      outDir: './out/main',
      lib: {
        entry: 'src/main/index.js',
        formats: ['cjs'],
      },
    },
  },
  preload: {
    build: {
      outDir: './out/preload',
      lib: {
        entry: 'src/preload/index.js',
        formats: ['cjs'],
      },
      // https://www.electronjs.org/docs/latest/tutorial/sandbox#preload-scripts
      // in sandbox mode, preload scripts run in a separate context,
      // `require` function is a polyfill with limited functionality,
      // we need to bundle all dependencies in preload scripts
      externalizeDeps: false,
    },
  },
  renderer: {
    build: {
      outDir: './out/renderer',
      rollupOptions: {
        input: 'src/renderer/index.html',
      },
    },
  },
});
