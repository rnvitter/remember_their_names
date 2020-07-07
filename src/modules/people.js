import axios from 'axios'

import * as types from './mutation-types'

import { API_URL, S3_URL } from '@/constants'

const state = {
  list: []
}

const mutations = {
  [types.PUT_PEOPLE] (state, data) {
    let result = data.rows.map(a => data.headers.reduce((r, k, i) => Object.assign(r, { [k]: a[i] }), {}))
    result = result.filter(r => {
      // TODO: update this to filter out any that have null props
      return r.name && r.gender_pronoun && r.date_of_death && r.description && r.bio && r.author && r.editor
    }).sort((a, b) => {
      let aSplitDate = a.date_of_death.split('/')
      let bSplitDate = b.date_of_death.split('/')
      let aDate = aSplitDate[2] + aSplitDate[0] + aSplitDate[1]
      let bDate = bSplitDate[2] + bSplitDate[0] + bSplitDate[1]
      return bDate.localeCompare(aDate)
    })
    state.list = result
  }
}

const actions = {
  get: ({ commit }) => {
    if (process.env.NODE_ENV === 'production') {
      return axios.get(`${S3_URL}/stories.json`).then((response) => {
        commit(types.PUT_PEOPLE, response.data)
      })
    } else {
      return axios.get(`${API_URL}/data`)
        .then((response) => {
          commit(types.PUT_PEOPLE, response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}

const getters = {
  list (state) {
    return state.list
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
