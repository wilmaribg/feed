export default {
  install (app) {
    let publicPath = '/report-feed'
    if (process.env.NODE_ENV === 'dev') publicPath = '/'
    app.config.globalProperties.$publicPath = publicPath
  }
}