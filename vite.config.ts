import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import config from './src/config/index'
export default defineConfig({
  base: config.base,
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
      ],
      dts: 'types/auto-import.d.ts'
    }),
    Components({
      dts: 'types/components.d.ts',
      resolvers: [ElementPlusResolver()]
    })
  ],
  build: {
    outDir: config.outDir,
    assetsDir: config.outAssetsDir,
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src/') },
      { find: '/#', replacement: resolve(__dirname, 'types/') }
    ]
  }
})
