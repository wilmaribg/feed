// import * as io from 'socket.io-client'
var io = require('socket.io-client')
console.log('1');
// const socketInstance = io(`https://sales.nodriza.io/`)
const socketInstance = io(`https://dev.nodriza.io:3000`)
console.log('2');
socketInstance.on('error', (err) => console.log('❌ Socket error', err))
socketInstance.on("disconnect", () => console.log('🔌 Socket disconnect', socketInstance))

socketInstance.on('connect', () => {
  console.log('3');
  // const { connected } = socketInstance.emit('authenticate', { accessToken: 'b9d8d7eb-cae5-47a0-b6d0-ef710bde2297' }) // sales
  const { connected } = socketInstance.emit('authenticate', { accessToken: '92064da9-32b6-48c2-9cf8-b5cd7ced1b59' }) // dev
  console.log('💡 Socket Authenticated:', connected)
})

// 
// 5b0033c37a3bea001e0de142


// socketInstance.on('5b0033c37a3bea001e0de142', (data) => { // sales
socketInstance.on('5941abf8e304bac92a6b521c', (data) => {
    console.log('DaTA > ', data )
})
