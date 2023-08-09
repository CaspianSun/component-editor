import { createApp } from 'vue'
import App from './App.vue'

import Router from './router/index'
import Pinia from './store/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'

import Property from '@/property/component'
import CommonComponents from '@/components/common'

import './style/index.scss'

const app = createApp(App)
if (process.env.NODE_ENV === 'development') {
  app.use(ElementPlus).use(Vant)
}

app.use(Router).use(Pinia).use(Property).use(CommonComponents).mount('#app')
