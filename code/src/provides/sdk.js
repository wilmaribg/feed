import { get } from 'lodash'
import { Apis } from 'nodriza/src/api/index.js'
import * as io from 'socket.io-client'
import fakeSession from '../fakeSession.json'

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
  hostname () {
    if (process.env.NODE_ENV == 'development') {
      return 'dev.nodriza.io'
    } else {
      return window.location.hostname
    }
  }
}

const socketInstance = io(`https://${config.hostname()}/`)
socketInstance.on('error', (err) => console.log('❌ Socket error', err))
socketInstance.on("disconnect", () => console.log('🔌 Socket disconnect', socketInstance))
socketInstance.on('connect', () => {
  const { connected } = socketInstance.emit('authenticate', { accessToken: config.accessToken() })
  console.log('💡 Socket Authenticated:', connected)
})

const socket = socketInstance
const sdk = new Apis({ 
  hostname: config.hostname(),
  accessToken: config.accessToken(), 
})

export { config, socket, sdk, sdk as default }