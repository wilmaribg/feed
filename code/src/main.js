import moment from 'moment'
import { get } from 'lodash'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Lottie from 'vue3-lottie'
import DropdownMenu from 'v-dropdown-menu'

import 'bulma'
import 'boxicons'
import '@element-plus/icons-vue'
import 'vue3-lottie/dist/style.css'
import 'v-dropdown-menu/dist/v-dropdown-menu.css'
import 'element-plus/dist/index.css'
import '@/styles/root-vars.scss'

import App from '@/App.vue'
import router from '@/router'
import eventBus from '@/provides/eventBus'
import { sdk, socket } from '@/provides/sdk'
import pluginEmitter from '@/provides/emitter'
import filter from '@/filters/filter'
import Page from '@/components/page/PageComponent'

const pinia = createPinia()
const app = createApp(App)

app.provide('get', get)
app.provide('sdk', sdk)
app.provide('moment', moment)
app.provide('socket', socket)
app.provide('eventBus', eventBus)
app.provide('$emitter', pluginEmitter)

app.use(pinia)
app.use(Vue3Lottie)
app.use(DropdownMenu)  
app.use(router)
app.use(filter)
app.component('PageComponent', Page)
app.mount('#app')
