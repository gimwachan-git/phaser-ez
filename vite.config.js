import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: 'src/core/index.js',
        Phaser: 'src/core/Phaser.js',
        utils: 'src/utils/index.js'
      },
      name: 'PhaserEZ',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['phaser'],
      output: [
        {
          format: 'es',
          dir: 'dist/es',
          entryFileNames: '[name].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          exports: 'named',
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          entryFileNames: '[name].cjs',
          chunkFileNames: 'assets/js/[name]-[hash].cjs.js',
          exports: 'named',
        },
      ],
    },
  },
});