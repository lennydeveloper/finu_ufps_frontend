import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      hola: 'mundo',
    },
  },
  mutations: {
    guardarUsuario(state, user) {
      state.user = user
    },
  },
  actions: {
    guardarUsuario({ commit }, user) {
      commit('guardarUsuario', user)
    },
  },
  getters: {
    getUsuario(state) {
      return state.user
    },
  },
  modules: {},
})
