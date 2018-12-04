import Vue from 'vue'

export const state = () => ({
  showFirstPixel: true,
  showGraph: false,
  applyFilter: false,
  filterBy: 0
})

export const actions = {
  set({ commit }, { key, value }) {
    commit('set', { key, value })
  }
}

export const mutations = {
  set(state, { key, value }) {
    if (typeof state[key] === 'number') {
      value = parseFloat(value) || 0
    }
    Vue.set(state, key, value)
  }
}
