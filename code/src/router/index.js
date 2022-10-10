import { createRouter, createWebHashHistory } from 'vue-router'
import PreloaderView from '@/views/PreloaderView.vue'
import FeedView from '@/views/FeedView.vue'

const routes = [
  {
    path: '/',
    name: 'preloaderView',
    component: PreloaderView
  },
  {
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

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
