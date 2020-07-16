import axios from 'axios'

import * as types from './mutation-types'
import { API_URL, S3_URL } from '@/constants'

const state = {
  collections: [],
  list: []
}

const mutations = {
  [types.PUT_COLLECTIONS] (state, data) {
    state.collections = data
  },
  [types.PUT_RESOURCES] (state, data) {
    state.list = data
  }
}

const actions = {
  get: ({ commit }, { endpoint, sheet }) => {
    function parseData(response) {
      let rows = response.rows
      let headers = response.headers
      let result = rows.map(a => headers.reduce((r, k, i) => Object.assign(r, { [k]: a[i] }), {}))
      result = result.filter(r => {
        // TODO: update this to filter out any that have null props
        return r.name
      })
      return result
    }

    if (process.env.NODE_ENV === 'production') {
      const filename = sheet.replace(/ /g, '_').toLowerCase()
      return axios.get(`${S3_URL}/${filename}.json`).then((response) => {
        let result = parseData(response.data)
        commit(types.PUT_RESOURCES, result)
      })
    } else {
      return axios.get(`${API_URL}/${endpoint}`, {
        params: {
          sheet: sheet
        }
      })
        .then((response) => {
          let result = parseData(response.data)
          commit(types.PUT_RESOURCES, result)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  getSchema: ({ commit }) => {
    if (process.env.NODE_ENV === 'production') {
      const filename = 'collections'
      return axios.get(`${S3_URL}/${filename}.json`).then((response) => {
        let collections = []
        response.data.rows.forEach(r => collections.push(...r))
        commit(types.PUT_COLLECTIONS, collections)
      })
    } else {
      return axios.get(`${API_URL}/how_to_help`, {
        params: {
          sheet: 'Collections'
        }
      })
        .then((response) => {
          let collections = []
          response.data.rows.forEach(r => collections.push(...r))
          commit(types.PUT_COLLECTIONS, collections)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}

const getters = {
  collections (state) {
    return state.collections
  },
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
