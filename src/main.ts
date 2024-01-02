import { createApp } from 'vue'
import App from './App.vue'
import Router from './router/index'
import Pinia from './store/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './style/index.scss'
import 'virtual:uno.css'

const app = createApp(App)

app.use(Router).use(Pinia).use(ElementPlus).mount('#app')
