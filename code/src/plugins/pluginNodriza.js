import { get } from 'lodash'
import Nodriza from 'nodriza'
import * as io from 'socket.io-client'

import { useProfileStore } from '@/store/profile'
import { $emitter } from '@/plugins/pluginEmitter.js'

export default {
  install(app, options) {    
    let hostname = window.location.hostname
    let accessToken, session = window.localStorage.session

    if (typeof session === 'string') session = JSON.parse(session)
    if (process.env.NODE_ENV === 'development') hostname = options.hostname

    accessToken = get(session, 'token.accessToken', null)
    
    const socket = io(`https://${hostname}:3000/`)
    const sdk = new Nodriza({ hostname, accessToken, _window: window })

    socket.on('error', (err) => console.log('❌ Socket error', err))
    socket.on("disconnect", () => console.log('🔌 Socket disconnect'))
  
    socket.on("connect", () => {
      console.log('💡 Socket connect')
      socket.emit('authenticate', { accessToken })
      sdk.api.user.me((err, me) => {
        if (err) return console.error(err)
        useProfileStore().setProfile(me)
        console.log('👂 Socket listen ----->', String(me.id))
        socket.on(String(me.id), event => {
          console.log('roge event ---->', event)
          const onSocket = 'onSocket'
          $emitter.off(onSocket, event)
          $emitter.emit(onSocket, event)
        })
      })
    })

    window.wc = sdk
    app.config.globalProperties.$wc = sdk
    app.config.globalProperties.$socket = socket
    app.provide('integration', { sdk, socket })
  }
}