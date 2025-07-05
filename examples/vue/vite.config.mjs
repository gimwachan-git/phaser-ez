import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import fs from 'node:fs'
import path from 'node:path'
import { gray, green, red, yellow } from 'kolorist'

const outDir = 'dist'

export default defineConfig({
  base: './',
  outDir: outDir,
  plugins: [
    vue(),
    ViteImageOptimizer()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080
  },
  // logLevel: 'warning',
  build: {
    target: 'es2015',
    rollupOptions: {
      // external: ['phaser'],
      output: {
        entryFileNames: `assets/js/[name]-[hash].js`,
        chunkFileNames: `assets/js/[name]-[hash].js`,
        assetFileNames(assetInfo) {
          if (assetInfo.name.endsWith('.css')) {
            return `assets/css/[name]-[hash].css`
          }
          const fontExts = ['.woff', '.woff2', '.ttf', '.eot']
          if (fontExts.some((ext) => assetInfo.name.endsWith(ext))) {
            return `assets/fonts/[name]-[hash].[extname]`
          }
          const imgExts = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp', '.avif']
          if (imgExts.some((ext) => assetInfo.name.endsWith(ext))) {
            return `assets/images/[name]-[hash].[extname]`
          }
          const soundExts = ['.mp3', '.ogg', '.wav', '.m4a']
          if (soundExts.some((ext) => assetInfo.name.endsWith(ext))) {
            return `assets/sounds/[name]-[hash].[extname]`
          }
          const videoExts = ['.mp4', '.webm']
          if (videoExts.some((ext) => assetInfo.name.endsWith(ext))) {
            return `assets/videos/[name]-[hash].[extname]`
          }
          return `assets/[name]-[hash].[extname]`
        }
      },
    },
    assetsInlineLimit: 0,
    assetsInclude: ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp', '.avif'],
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 2
      },
      mangle: true,
      format: {
        comments: false
      }
    }
  },
  // esbuild: {
  //   drop: ['console', 'debugger']
  // },
  // ssr: {
  //     external: ['phaser']
  // },
  ssgOptions: {
    script: 'sync',
    formatting: 'prettify',
    onFinished() {
      // delete `/${outDir}/.vite` folder
      const pluginName = 'vite-phaser'
      const dir = path.resolve(__dirname, '../' + outDir, '.vite')
      if (fs.existsSync(dir)) {
        console.log(`\n${gray(`[${pluginName}]`)} ${yellow('Cleaning up...')}`)
        fs.rm(dir, { recursive: true }, (err) => {
          if (err) console.error(`${gray(`[${pluginName}]`)} ${red(`Error: ${err}`)}`)
          console.log(`${gray(`[${pluginName}]`)} ${green('Cleaning up finished.')}\n`)
        })
      }
    }
  }
})
