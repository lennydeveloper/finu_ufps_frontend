import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import DashboardLayout from './components/DashboardLayout.vue'
import EmptyLayout from './components/EmptyLayout.vue'

const app = createApp(App)

const store = createStore({
  state: {
    user: {},
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

app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)

app.use(router)
app.use(store)
app.mount('#app')
