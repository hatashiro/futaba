import Vue from 'vue'

const key = 'eval'

let evaluation
try {
  evaluation = JSON.parse(localStorage.getItem(key))
} finally {
  evaluation = evaluation && typeof evaluation === 'object' ? evaluation : {}
}

export const state = () => ({
  evaluation
})

export const actions = {
  sync({ state }) {
    Vue.nextTick(() =>
      localStorage.setItem(key, JSON.stringify(state.evaluation))
    )
  },

  evaluate({ commit, dispatch }, { id, val }) {
    commit('setEvaluation', { id, val })
    dispatch('sync')
  }
}

export const mutations = {
  setEvaluation(state, { id, val }) {
    Vue.set(state.evaluation, id, val)
  }
}
