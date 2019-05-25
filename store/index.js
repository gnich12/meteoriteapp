export const state = () => ({
  meteors: [],
  limit: 1000,
  maxLimit: 47516,
  noResult: false
})
export const actions = {
  async callMeteor({ commit }, payload) {
    const url = `https://data.nasa.gov/resource/gh4g-9sfh.json?` +
    `$order=name&$limit=${payload.limit}&$offset=${payload.offset}`
    // commit('resetNoResult')
    let dat = await this.$axios.$get(url)
    commit('setMeteorData', dat)
  },
  async searchMeteor({ commit }, payload) {
    const url = `https://data.nasa.gov/resource/gh4g-9sfh.json?` +
    `$order=name&${payload.query}`
    // commit('resetNoResult')
    let dat = await this.$axios.$get(url)
    commit('setMeteorData', dat)
  },
  noResult({ commit }, payload) {
    commit('setNoResult', payload)
  }
}
export const mutations = {
  setMeteorData: (state, payload) => {
    state.meteors = payload
  },
  setNoResult: (state, payload) => {
    state.noResult = payload
  },
  resetNoResult: (state) => {
    state.noResult = false
  }
}
export const getters = {
  getMeteorData(state) {
    return state.meteors
  },
  getDataLimit(state) {
    return state.meteors.length
  },
  getMaxDataLimit(state) {
    return state.maxLimit
  },
  getNoResult(state) {
    return state.noResult
  }
}

