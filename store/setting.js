import Vue from 'vue'

export const state = () => ({
  showFirstPixel: true
})

export const actions = {
  set({ commit }, { key, value }) {
    commit('set', { key, value })
  }
}

export const mutations = {
  set(state, { key, value }) {
    Vue.set(state, key, value)
  }
}
