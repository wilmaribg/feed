import { get } from 'lodash'
import { createRouter, createWebHashHistory } from 'vue-router'
import PreloaderView from '@/views/PreloaderView.vue'
import FiltersView from '@/views/FiltersView.vue'
import FeedView from '@/views/FeedView.vue'
import { config } from '@/provides/sdk.js'
import { UserMe, EventsFiltersExists } from '@/queries/index.js'

const routes = [
  {
    secure: true,
    path: '/',
    name: 'preloaderView',
    component: PreloaderView
  },
  {
    secure: true,
    path: '/feed',
    name: 'FeedView',
    component: FeedView
  },
  {
    secure: true,
    path: '/filters',
    name: 'FiltersView',
    component: FiltersView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const redirectToLogin = () => {
  if (process.env.NODE_ENV == 'development') {
    window.location.replace(`https://${config.hostname()}/app/login`)
  } else {
    window.location.replace('/app/login')
  }
}

const checkExistsFilters = async () => {
  try {
    return await EventsFiltersExists()
  } catch(err) {
    console.error('roge checkExistsFilters ---->', err)
    return false
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  try {
    const res = await UserMe()
    const home = get(res, 'home')
    if (!home) return redirectToLogin()
    if (/preloaderView|FeedView/gi.test(to.name) && !await checkExistsFilters()) {
      return next({ name: 'FiltersView' })
    }
    return next() 
  } catch (err) {
    console.error('roge err router beforeEach ---->', err)
    return redirectToLogin()
  }
})

export default router
