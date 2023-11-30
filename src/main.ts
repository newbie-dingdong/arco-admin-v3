import { createApp } from 'vue'
import { Notification } from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon/arco-vue-icon'
import App from './App.vue'
import router from './router'
import pinia from '@/store/index'
import 'uno.css'

const app = createApp(App)
Notification._context = app._context
app.use(router).use(pinia).use(ArcoVueIcon)

app.mount('#app')
