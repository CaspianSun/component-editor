import { createApp } from 'vue'
import App from './App.vue'
import Router from './router/index'
import Pinia from './store/index'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import 'virtual:uno.css'
import 'vant/lib/index.css'
import './style/index.scss'

const app = createApp(App)

app.use(Router).use(Pinia).use(ElementPlus).mount('#app')
