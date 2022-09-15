import { createApp } from 'vue'
import { createPinia } from 'pinia'
import elementPlus from 'element-plus'

import 'element-plus/dist/index.css'

import App from '@/App.vue'
import router from '@/router'
import filter from '@/filters/filter'
import pluginNodriza from '@/plugins/pluginNodriza'
import pluginFakeSession from '@/plugins/pluginFakeSession'
import Avatar from '@/components/Avatar'
import Page from '@/components/page/Page'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(elementPlus)
  .use(router)
  .use(filter)
  .use(pluginFakeSession, { mode: process.env.NODE_ENV })
  .use(pluginNodriza, { hostname: 'dev.nodriza.io' })
  .component('PageComponent', Page)
  .component('AvatarComponent', Avatar)
  .mount('#app')
