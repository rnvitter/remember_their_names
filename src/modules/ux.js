import * as types from './mutation-types'

const state = {
  screenSize: {}
}

const mutations = {
  [types.SET_SCREEN_SIZE] (state, screenSize) {
    state.screenSize = screenSize
  }
}

const actions = {
  setScreenSize: ({ commit }, screenSize) => {
    commit(types.SET_SCREEN_SIZE, screenSize)
  }
}

const getters = {
  screenSize (state) {
    return state.screenSize
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
