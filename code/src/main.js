import { createApp } from 'vue'
import { createPinia } from 'pinia'
import elementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Vue3Lottie from 'vue3-lottie'
import moment from 'moment'

import 'vue3-lottie/dist/style.css'
import 'element-plus/dist/index.css'
import '@/styles/root-vars.scss'

import App from '@/App.vue'
import router from '@/router'
import { sdk, socket } from '@/provides/sdk'
import filter from '@/filters/filter'
// import pluginNodriza from '@/plugins/pluginNodriza'
import pluginEmitter from '@/plugins/pluginEmitter'
import pluginFakeSession from '@/plugins/pluginFakeSession'
import pluginPublicPath from '@/plugins/pluginPublicPath'
import Avatar from '@/components/Avatar'
import Page from '@/components/page/Page'

const pinia = createPinia()
const app = createApp(App)

app.provide('sdk', sdk)
app.provide('socket', socket)
app.provide('moment', moment)

app.use(pinia)
app.use(elementPlus)
app.use(Vue3Lottie)
app.use(router)
app.use(filter)
app.use(pluginPublicPath)
app.use(pluginEmitter)
app.use(pluginFakeSession, { mode: process.env.NODE_ENV })
// app.use(pluginNodriza, { hostname: 'dev.nodriza.io' })

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`Icon${key}`, component)
}

app.component('PageComponent', Page)
app.component('AvatarComponent', Avatar)
app.mount('#app')
