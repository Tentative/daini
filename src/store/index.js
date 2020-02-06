import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import axios from 'axios'

Vue.use(Vuex);

axios.defaults.baseURL = 'https://data.reevo.io';

const modulesFiles = require.context('./modules', false, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules
}, {});

const _store = new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    IsMemorizzaPassword: false,
    CodiceRichiesta: '',
    user: {},
    isLoggedIn: null
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
      state.isLoggedIn = null
    },
    request(state) {
      state.CodiceRichiesta = ''
    },
    keepLogged(state) {
      state.IsMemorizzaPassword = ''
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: proxy + URL, data: user, method: 'GET' })
          .then(resp => {
            const token = resp.data.access_token
            const user = resp.data.user
            this.state.isLoggedIn = true
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    requestALL() {
      this.$axios.get("/", {
        CodiceClient: "reevolacerba2020",
        VersioneClient: "0.0.1",
        IndirizzoIP: ipUtente,
        UserAgent: navigator.UserAgent,
        Url: window.location.href,
        JsonWebToken: jwtUtente,
        CodiceRichiesta: state.CodiceRichiesta,
        JsonRichiesta: JSON.stringify(Richiesta)

      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  modules,
  getters,
  plugins: [createPersistedState({
    key: 'frog-admin'
  })]
});


export default _store;
