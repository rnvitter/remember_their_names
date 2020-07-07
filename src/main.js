import 'milligram/dist/milligram.min.css'

import Vue from 'vue'
import { VLazyImagePlugin } from 'v-lazy-image';

import App from './App.vue'

import router from './router'
import store from './store'
import filters from './filters'

Vue.use(VLazyImagePlugin)

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
