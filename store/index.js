export const state = () => ({
  meteors: [],
  limit: 1000,
  maxLimit: 47516,
  noResult: false,
  currentPage: 1,
  isSearch: null,
  numberResult: 0
})
export const actions = {
  async callMeteor({ commit }, payload) {
    const url = `https://data.nasa.gov/resource/gh4g-9sfh.json?` +
    `$order=name&$limit=${payload.limit}&$offset=${payload.offset}`
    // commit('resetNoResult')
    commit('setNewLimit', payload.limit) 
    commit('setCurrentPage', payload.page)
    let dat = await this.$axios.$get(url)
    commit('setMeteorData', dat)
  },
  async searchMeteor({ commit}, payload) {
    const countTerms = `https://data.nasa.gov/resource/gh4g-9sfh.json?` +
    `$select=count(name)&${payload.query}`
    let resultCount = await this.$axios.$get(countTerms)
    commit('setNewLimit', resultCount[0].count_name) 
    if(resultCount !== undefined) {
      const url = `https://data.nasa.gov/resource/gh4g-9sfh.json?` +
      `$order=name&${payload.query}&$limit=${resultCount[0].count_name}&$offset=0`  
      let dat = await this.$axios.$get(url)
      commit('setCurrentPage', payload.page)
      commit('setMeteorData', dat)
    }
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
  },
  setCurrentPage (state, page) {
    state.currentPage = page
  },
  setIsSearch (state, searchState) {
    state.isSearch = searchState
  },
  setNewLimit (state, newLimit) {
    state.limit = newLimit
  },
  setNumberTerms (state, number) {
    state.numberResult = number
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
  },
  getCurrentPage(state) {
    return state.currentPage
  },
  getResultNumber(state) {
    return state.numberResult
  },
  getIsSearch(state) {
    return state.isSearch
  },
  getLimit(state) {
    return state.limit
  }
}

