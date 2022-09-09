import { get } from 'lodash'
import Nodriza from '@/nodriza/src'

import * as socketIOClient from 'socket.io-client'
import * as sailsIOClient from 'sails.io.js'

export default {
  install(app, options) {    
    let hostname = window.location.hostname
    let accessToken, session = window.localStorage.session

    if (typeof session === 'string') session = JSON.parse(session)
    if (process.env.NODE_ENV === 'development') hostname = options.hostname

    accessToken = get(session, 'token.accessToken', null)
    
    const nodriza = new Nodriza({ hostname, accessToken, _window: window })

    app.config.globalProperties.$nodriza = nodriza

    // window.io = socketIOClient
    const io = sailsIOClient(socketIOClient)
    io.sails.transports = ['websocket', 'polling']
    io.sails.url = 'https://' + hostname
    io.sails.useCORSRouteToGetCookie = '/app/__getcookie'

    // window.io = io

    // nodriza.addListener('init', (url) => {
    //   console.log('--> Connecting to ' + url)
    // }, false)

    // nodriza.addListener('connect', (socketId) => {
    //   console.log('--> Connected to socketId: ' + socketId)
    // }, false)

    // nodriza.addListener('authenticated', (socketId) => {
    //   console.log('--> Socket authenticated > ' + socketId)
    // }, false)

    // nodriza.addListener('disconnect', () => {
    //   console.log('--> Disconnected on ' + new Date())
    // }, false)

    // nodriza.addListener('exec', (event) => {
    //   console.log('--> exec on ', event)
    // }, false)

    // nodriza.connect()

    // console.log(nodriza)

    // window.sdk = nodriza
  }
}