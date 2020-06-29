import * as types from './mutation-types'

const state = {
  screenSize: {},
  view: 'shuffle'
}

const mutations = {
  [types.SET_SCREEN_SIZE] (state, screenSize) {
    state.screenSize = screenSize
  },
  [types.TOGGLE_VIEW] (state, view) {
    state.view = view
  }
}

const actions = {
  setScreenSize: ({ commit }, screenSize) => {
    commit(types.SET_SCREEN_SIZE, screenSize)
  },
  toggleView: ({ commit }, view) => {
    commit(types.TOGGLE_VIEW, view)
  }
}

const getters = {
  screenSize (state) {
    return state.screenSize
  },
  view (state) {
    return state.view
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
