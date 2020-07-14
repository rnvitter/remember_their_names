import axios from 'axios'

import { API_URL, S3_URL } from '@/constants'

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
      return axios.get(`${S3_URL}/${filename}.json`).then((response) => {
        return parseData(response.data)
      })
    } else {
      return axios.get(`${API_URL}/${endpoint}`, {
        params: {
          sheet: sheet
        }
      })
        .then((response) => {
          console.log(parseData(response.data))
          return parseData(response.data)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  getSchema: () => {
    if (process.env.NODE_ENV === 'production') {
      const filename = 'Collections'
      return axios.get(`${S3_URL}/${filename}.json`).then((response) => {
        let collections = []
        response.data.rows.forEach(r => r.push(collections))
        return collections
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
          return collections
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
