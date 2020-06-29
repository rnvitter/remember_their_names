import axios from 'axios'

// import * as types from './mutation-types'

const API_URL = process.env.VUE_APP_API_URL

const state = {}

const mutations = {}

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
      let data = require(`@/assets/${filename}.json`)
      return parseData(data)
    } else {
      return axios.get(`${API_URL}/${endpoint}`, {
        params: {
          sheet: sheet
        }
      })
        .then((response) => {
          return parseData(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  getSchema: () => {
    function parseData(response) {
      let rows = response.rows
      let headers = response.headers
      let result = rows.map(a => headers.reduce((r, k, i) => Object.assign(r, { [k]: a[i] }), {}))
      return result
    }

    if (process.env.NODE_ENV === 'production') {
      const filename = 'schema_(admin_only)'
      let data = require(`@/assets/${filename}.json`)
      return parseData(data)
    } else {
      return axios.get(`${API_URL}/how_to_help`, {
        params: {
          sheet: 'Schema (Admin Only)'
        }
      })
        .then((response) => {
          return parseData(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
