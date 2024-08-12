/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import VueDevTools from 'vite-plugin-vue-devtools'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '~/': `${path.resolve(__dirname, 'types')}/`,
    },
  },
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      filename: 'stats.html',
    }),

    VueDevTools(),

    Vue({
      script: {
        propsDestructure: true,
        defineModel: true,
      },
    }),

    VueJsx(),

    // https://www.npmjs.com/package/vite-plugin-mock
    viteMockServe({
      enable: true,
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
  ],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@element-plus/icons-vue'))
            return 'element-icons'

          if (id.includes('element-plus'))
            return 'element-plus'
        },
      },
    },
  },

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
