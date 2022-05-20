export const state = () => ({
  initNews: {},
})

export const mutations = {
  setNewsInit(state, payload) {
    state.initNews = payload
  },
}

export const actions = {
  setNewsInit({ commit }, payload) {
    commit('setNewsInit', payload)
  },
}

export const getters = {
  getNewsObject: (s) => s.initNews?.data ?? {},
  getNewsList: (s) => s.initNews?.data?.results ?? [],
  getNewsLoaded: (s) => s.initNews?.loaded ?? false,
}
