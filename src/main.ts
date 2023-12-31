import { createApp } from 'vue'
import App from './App.vue'
import Router from './router/index'
import Pinia from './store/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueKonva from 'vue-konva'

import Property from '@/common/component'
import './style/index.scss'
import 'virtual:uno.css'

const app = createApp(App)

app.use(Router).use(Pinia).use(VueKonva).use(ElementPlus).use(Property).mount('#app')
