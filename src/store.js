import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(Vuex)

const strict = process.env.NODE_ENV != 'production'

const store = new Vuex.Store({
  modules,
  strict
})

export default store
