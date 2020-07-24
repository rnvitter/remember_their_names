import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import Vue from 'vue'
import VueVirtualScroller from 'vue-virtual-scroller'

import App from './App.vue'

import router from './router'
import store from './store'
import filters from './filters'

Vue.use(VueVirtualScroller)

Vue.config.productionTip = false

Object.keys(filters).forEach((name) => {
  const filter = filters[name]
  Vue.filter(name, filter)
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
