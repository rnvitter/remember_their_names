import Vue from 'vue'
import Router from 'vue-router'

import { About, Home, HowToHelp, StandardHelpView, Statistics } from './views'

Vue.use(Router)

const routes = [
  {
    path: '*',
    redirect: '/'
  }, {
    path: '/',
    name: 'home',
    component: Home,
  }, {
    path: '/statistics',
    name: 'statistics',
    component: Statistics
  }, {
    path: '/about',
    name: 'about',
    component: About
  }, {
    path: '/how_to_help',
    name: 'how_to_help',
    component: HowToHelp
  }, {
    path: '/become_more_informed',
    meta: {
      howToHelpView: true
    },
    name: 'become_more_informed',
    component: StandardHelpView,
    props: {
      title: 'Become More Informed',
      description: 'We have compiled a great list of sources for you to read, watch, share, and discuss with friends and family.',
    }
  },
  {
    path: '/take_political_action',
    meta: {
      howToHelpView: true
    },
    name: 'take_political_action',
    component: StandardHelpView,
    props: {
      title: 'Take Political Action',
      description: 'This is a list of resources to help you enact political action on a local, state, and nationwide level.'
    }
  },
  {
    path: '/donate',
    meta: {
      howToHelpView: true
    },
    name: 'donate',
    component: StandardHelpView,
    props: {
      title: 'Donate',
      description: 'Donate your time and money. Here are some organizations you can donate to or that could use volunteers. We want to grow this list so if you have an organization you want to add please contact us with the details.',
    }
  },
  {
    path: '/resources_for_educators',
    meta: {
      howToHelpView: true
    },
    name: 'resources_for_educators',
    component: StandardHelpView,
    props: {
      title: 'Resources For Educators',
      description: 'This is a collection of resources for teachers to use in their classrooms to help teach students about racism and create a better learning evironment for everyone.',
    }
  },
  {
    path: '/support_black_owned_businesses',
    meta: {
      howToHelpView: true
    },
    name: 'support_black_owned_businesses',
    component: StandardHelpView,
    props: {
      title: 'Support Black Owned Businesses',
      description: 'We\'ve compiled a list of apps and websites that you can use to search for locally owned black businesses in your area.'
    }
  },
  {
    path: '/support_black_creators',
    meta: {
      howToHelpView: true
    },
    name: 'support_black_creators',
    component: StandardHelpView,
    props: {
      title: 'Support Black Creators',
      description: 'Support black artists, musicians, and writers by sharing and buying their work.',
    }
  },
  {
    path: '/more_great_websites_like_ours',
    meta: {
      howToHelpView: true
    },
    name: 'more_great_websites_like_ours',
    component: StandardHelpView,
    props: {
      title: 'More Great Websites Like Ours',
      description: 'A bunch of other links to other great websites like ours! You can never have too much of a good thing.',
    }
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
