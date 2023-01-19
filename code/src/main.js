import moment from 'moment'
import { get } from 'lodash'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Lottie from 'vue3-lottie'
import vClickOutside from 'click-outside-vue3'
import Notifications from '@kyvg/vue3-notification'

import 'bulma'
import 'bulma-tooltip'
import 'boxicons/css/boxicons.css'
import 'font-awesome/css/font-awesome.css'
import '@element-plus/icons-vue'
import 'vue3-lottie/dist/style.css'
import 'element-plus/dist/index.css'
import '@/styles/root-vars.scss'

import App from '@/App.vue'
import router from '@/router'
import notification from '@/provides/notification'
import { sdk, socket } from '@/provides/sdk'
import eventBus from '@/provides/eventBus'
import zoom from '@/provides/zoom'
import pluginEmitter from '@/provides/emitter'
import filter from '@/filters/filter'
import Page from '@/components/page/PageComponent'

const pinia = createPinia()
const app = createApp(App)

app.provide('get', get)
app.provide('sdk', sdk)
app.provide('zoom', zoom)
app.provide('moment', moment)
app.provide('socket', socket)
app.provide('eventBus', eventBus)
app.provide('$emitter', pluginEmitter)
app.provide('notification', notification)

app.use(pinia)
app.use(vClickOutside)
app.use(Notifications)
app.use(Vue3Lottie)  
app.use(router)
app.use(filter)
app.component('PageComponent', Page)
app.mount('#app')
