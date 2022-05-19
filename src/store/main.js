export const state = () => ({
  slides: {},
})

export const mutations = {
  updateSlider(state, payload) {
    state.slides = { ...state.slides, ...payload }
  },
}

export const actions = {
  updateSlider({ commit }, payload) {
    commit('updateSlider', payload)
  },
}

export const getters = {
  getSliderList: (s) => (key) => s.slides?.[key]?.data ?? [],
  getSliderLoaded: (s) => (key) => s.slides?.[key]?.loaded ?? false,
}
