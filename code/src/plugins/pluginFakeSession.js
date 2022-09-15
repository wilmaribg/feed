import session from '@/fakeSession.json'

export default {
  install (app, options) {
    const { mode } = options
    if (!/development/gi.test(mode)) return
    window.localStorage.setItem('session', JSON.stringify(session))
  }
}