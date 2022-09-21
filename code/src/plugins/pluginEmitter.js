import emitter from 'tiny-emitter/instance'

const $emitter = {
  on: (...args) => emitter.on(...args),
  once: (...args) => emitter.once(...args),
  off: (...args) => emitter.off(...args),
  emit: (...args) => emitter.emit(...args)
}

const install = (app) => {
  app.config.globalProperties.$emitter = $emitter
}

export { $emitter, install as default }
