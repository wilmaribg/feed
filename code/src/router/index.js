import { get } from 'lodash'
import { createRouter, createWebHashHistory } from 'vue-router'
import PreloaderView from '@/views/PreloaderView.vue'
import FeedView from '@/views/FeedView.vue'
import { config } from '@/provides/sdk.js'
import { UserMe } from '@/queries/index.js'

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
    window.location.replace('https://dev.nodriza.io/app/login')
  } else {
    window.location.replace('/app/login')
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
    return next() 
  } catch (err) {
    console.log('roge err router beforeEach ---->', err)
    return redirectToLogin()
  }
})

export default router
