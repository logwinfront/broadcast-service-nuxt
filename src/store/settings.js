export const state = () => ({
  settings: {},
})

export const mutations = {
  setSettings(state, payload) {
    state.settings = payload
  },
}

export const actions = {
  setSettings({ commit }, payload) {
    commit('setSettings', payload)
  },
}

export const getters = {
  getSettings: (s) => s.settings,
  getHomeSeo: (s) => s.settings?.seo ?? null,
}
