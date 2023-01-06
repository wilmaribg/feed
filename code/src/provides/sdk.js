import { get } from 'lodash'
import { io } from 'socket.io-client'
import { Apis } from 'nodriza/src/api/index.js'

import fakeSession from '../fakeSession.json'

const HOST_NAME = 'dev4.nodriza.io'

const config = {
  session () {
    try {
      if (process.env.NODE_ENV == 'development') {
        window.localStorage.setItem('session', JSON.stringify(fakeSession))
        return fakeSession
      } else {
        return JSON.parse(window.localStorage.getItem('session'))
      }
    } catch (e) {
      return {}
    }
  },
  accessToken () {
    return get(this.session(), 'token.accessToken', null)
  },
  roles () {
    return get(this.session(), 'acl.roles', {})
  },
  hostname () {
    if (process.env.NODE_ENV == 'development') {
      return HOST_NAME
    } else {
      return window.location.hostname
    }
  }
}

// const socketInstance = io(`https://${HOST_NAME}/`)
const socketInstance = io(`https://${config.hostname()}/`)
socketInstance.on('error', (err) => console.log('❌ Socket error', err))
socketInstance.on("disconnect", () => console.log('🔌 Socket disconnect', socketInstance))
socketInstance.on('connect', () => {
  const { connected } = socketInstance.emit('authenticate', { accessToken: config.accessToken() })
  console.log('💡 Socket Authenticated:', connected)
})

const socket = socketInstance
const sdk = new Apis({ 
  sessionName: 'raf',
  hostname: config.hostname(),
  accessToken: config.accessToken(), 
})

export { config, socket, sdk, sdk as default }