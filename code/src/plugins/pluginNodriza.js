import { get } from 'lodash'
import Nodriza from 'nodriza'
import * as io from 'socket.io-client'

import { useProfileStore } from '@/store/profile'

export default {
  install(app, options) {    
    let hostname = window.location.hostname
    let accessToken, session = window.localStorage.session

    if (typeof session === 'string') session = JSON.parse(session)
    if (process.env.NODE_ENV === 'development') hostname = options.hostname

    accessToken = get(session, 'token.accessToken', null)
    
    const socket = io('https://dev.nodriza.io:3000/')
    const sdk = new Nodriza({ hostname, accessToken, _window: window })

    socket.on('error', (err) => console.log('❌ Socket error', err))
    socket.on("disconnect", () => console.log('🔌 Socket disconnect'))
  
    socket.on("connect", () => {
      console.log('💡 Socket connect')
      socket.emit('authenticate', { accessToken })
      sdk.api.user.me((err, me) => {
        if (err) throw new Error(me)
        useProfileStore().setProfile(me)
      })
    })

    window.wc = sdk
    app.config.globalProperties.$wc = sdk
    app.config.globalProperties.$socket = socket
    app.provide('integration', { sdk, socket })
  }
}