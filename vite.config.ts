import { defineConfig } from 'vite'
import { resolve } from 'path'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  server: {
    host: "0.0.0.0",
    proxy: {
      '^/api': 'http://example.com/',
    },
  },
  plugins: [
    Vue(),
    VueJsx(),
    UnoCSS(),
    mockDevServerPlugin(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src/') },
      { find: '/#', replacement: resolve(__dirname, 'types/') }
    ]
  }
})
