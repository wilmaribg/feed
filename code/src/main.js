import { createApp } from 'vue'
import { createPinia } from 'pinia'
import elementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

import 'element-plus/dist/index.css'

import App from '@/App.vue'
import router from '@/router'
import filter from '@/filters/filter'
import pluginNodriza from '@/plugins/pluginNodriza'
import pluginEmitter from '@/plugins/pluginEmitter'
import pluginFakeSession from '@/plugins/pluginFakeSession'
import Avatar from '@/components/Avatar'
import Page from '@/components/page/Page'

const pinia = createPinia()
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`Icon${key}`, component)
}

app.use(pinia)
app.use(elementPlus)
app.use(Vue3Lottie)
app.use(router)
app.use(filter)
app.use(pluginEmitter)
app.use(pluginFakeSession, { mode: process.env.NODE_ENV })
app.use(pluginNodriza, { hostname: 'dev.nodriza.io' })
app.component('PageComponent', Page)
app.component('AvatarComponent', Avatar)
app.mount('#app')
