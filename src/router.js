import Vue from 'vue'
import Router from 'vue-router'

import { About, Directory } from './views'

Vue.use(Router)

const routes = [
  {
    path: '*',
    redirect: '/'
  }, {
    path: '/',
    name: 'home',
    component: Directory,
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }
]

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from) {
    if (to.name !== from.name && to.hash) {
      let target = document.querySelector(to.hash)
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    } else if (to.name !== from.name) {
      return { x: 0, y: 0 };
    }
  }
})

export default router
