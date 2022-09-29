import moment from 'moment'
import theme from 'vitepress/dist/client/theme-default/index.js'
import 'element-plus/dist/index.css'

export default {
  Layout: theme.Layout,
  NotFound: theme.NotFound,
  enhanceApp({ app, router, siteData }) {
    app.provide('moment', moment)
  }
}