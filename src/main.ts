import { createApp } from 'vue'
import App from './App.vue'

import Router from './router/index'
import Pinia from './store/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Vant from 'vant'
import 'vant/es/toast/style'
import 'vant/lib/index.css'

import './style/index.scss'

import components from '@/components/index'

const app = createApp(App)

app.use(Router).use(Pinia).use(ElementPlus).use(Vant).use(components).mount('#app')
