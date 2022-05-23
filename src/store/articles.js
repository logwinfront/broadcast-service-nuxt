export const state = () => ({
  initArticles: {},
})

export const mutations = {
  setArticlesInit(state, payload) {
    state.initArticles = payload
  },
}

export const actions = {
  setArticlesInit({ commit }, payload) {
    commit('setArticlesInit', payload)
  },
}

export const getters = {
  getArticlesObject: (s) => s.initArticles?.data ?? {},
  getArticlesList: (s) => s.initArticles?.data?.results ?? [],
  getArticlesLoaded: (s) => s.initArticles?.loaded ?? false,
}
