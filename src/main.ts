import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/element-plus-index.scss'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/main.css'

const app = createApp(App)

app.use(ElementPlus)

app.use(router)

app.use(store)

app.mount('#app')
