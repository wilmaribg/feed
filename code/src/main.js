import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router'
import nodriza from '@/plugins/nodriza'
import fakeSession from '@/plugins/fakeSession'

createApp(App)
  .use(fakeSession, { mode: process.env.NODE_ENV })
  .use(router)
  .use(nodriza, { hostname: 'dev.nodriza.io' })
  .mount('#app')
