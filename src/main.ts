import { createApp } from 'vue'
import App from './App.vue'
import Router from './router/index'
import Pinia from './store/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/style.css'
import { IconFont } from '@nutui/icons-vue'
import '@nutui/icons-vue/dist/style_iconfont.css'

import 'virtual:uno.css'
import 'vant/lib/index.css'
import 'vue3-colorpicker/style.css'
import './style/index.scss'

const app = createApp(App)

if (typeof global === 'undefined') {
  ;(window as any).global = window
}

app.use(Router).use(Pinia).use(ElementPlus).use(NutUI)
app.component('NutIcon', IconFont)
app.mount('#app')
