import { defineConfig } from 'vite'
import { resolve } from 'path'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from 'vite-plugin-mock'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  server: {
    host: "0.0.0.0"
  },
  plugins: [
    Vue(),
    VueJsx(),
    UnoCSS(),
    viteMockServe({
      mockPath: 'mock',
      enable: true
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src/') },
      { find: '/#', replacement: resolve(__dirname, 'types/') }
    ]
  }
})
