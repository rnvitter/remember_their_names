import * as types from './mutation-types'

const state = {
  year: 2020,
  month: null
}

const mutations = {
  [types.SET_MONTH] (state, month) {
    state.month = month
  },
  [types.SET_YEAR] (state, year) {
    state.year = parseInt(year)
  }
}

const actions = {
  setMonth: ({ commit }, month) => {
    commit(types.SET_MONTH, month)
  },
  setYear: ({ commit }, year) => {
    commit(types.SET_YEAR, year)
  }
}

const getters = {
  month (state) {
    return state.month
  },
  year (state) {
    return state.year
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
