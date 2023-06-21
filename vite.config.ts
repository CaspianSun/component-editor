import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import config from './src/config/index'
export default defineConfig({
  base: config.base,
  server: {
    port: config.port
  },
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock',
      enable: true
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver(), IconsResolver(), VantResolver()],
      dts: 'types/auto-import.d.ts'
    }),
    Components({
      dts: 'types/components.d.ts',
      resolvers: [
        IconsResolver({
          enabledCollections: ['ep']
        }),
        ElementPlusResolver(),
        VantResolver()
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
  build: {
    outDir: config.outDir,
    assetsDir: config.outAssetsDir
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src/') },
      { find: '/#', replacement: resolve(__dirname, 'types/') }
    ]
  }
})
