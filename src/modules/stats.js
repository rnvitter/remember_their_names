import axios from 'axios'
import Papa from 'papaparse'

import * as types from './mutation-types'

const state = {
  wpFatalPoliceShootings: null
}

const mutations = {
  [types.SET_WP_FATAL_POLICE_SHOOTINGS_DATA] (state, data) {
    const json = Papa.parse(data, {
      header: true
    })
    const sortedData = json.data
      .filter(p => p.name)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
    state.wpFatalPoliceShootings = sortedData
  }
}

const actions = {
  getWpFatalPoliceShootingsData: ({ commit }) => {
    return axios.get('https://raw.githubusercontent.com/washingtonpost/data-police-shootings/master/fatal-police-shootings-data.csv')
      .then((response) => {
        commit(types.SET_WP_FATAL_POLICE_SHOOTINGS_DATA, response.data);
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

const getters = {
  wpFatalPoliceShootings (state) {
    return state.wpFatalPoliceShootings
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
