import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import getters from "./getters";
import axios from "axios";
import { queueScheduler } from "rxjs";

Vue.use(Vuex);

axios.defaults.baseURL = "https://data.reevo.io";

const modulesFiles = require.context("./modules", false, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const _store = new Vuex.Store({
  state: {
    status: "",
    keepLogged: true,
    token: localStorage.getItem("token") || "",
    CodiceRichiesta: "",
    ipUtente: "127.0.0.0",
    userAgentUtente: navigator.userAgent,
    url: window.location.href,
    jwtUtente: "",
    login: {
      NomeUtente: "",
      Password: "",
      IsMemorizzaPassword: false
    },
    user: {

    }
  },
  mutations: {
    auth_request(state, login) {
      state.status = "loading";
      state.login = login;
      state.CodiceRichiesta = "Login";
    },
    auth_success(state, jwtUtente, user) {
      state.status = "success";
      state.jwtUtente = jwtUtente;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.jwtUtente = "";
    },
    request(state) {
      state.CodiceRichiesta = "";
    },
    keepLogged(state) {
      state.IsMemorizzaPassword = "";
    },
  },
  actions: {
    // login({ commit }, user) {
    //   return new Promise((resolve, reject) => {
    //     commit('auth_request')
    //     axios({ url: "/", method: 'GET', headers: {
    //       "Content-Type" : "application/x-www-form-urlencoded"
    //     }, data: {
    //       NomeUtente: this.state.NomeUtente,
    //       Password: this.state.Password,
    //       CodiceRichiesta: this.state.CodiceRichiesta
    //     }} )
    //       .then(resp => {
    //         const token = resp.data.access_token
    //         const user = resp.data.user
    //         console.log("Codice risposta: " + resp.data.CodiceRisposta)
    //         localStorage.setItem('token', token)
    //         axios.defaults.headers.common['Authorization'] = token
    //         if (resp.data.CodiceRIsposta == 'Ok') {
    //         commit('auth_success', token, user) }
    //         resolve(resp)
    //         console.log(resp)
    //       })
    //       .catch(err => {
    //         commit('auth_error')
    //         localStorage.removeItem('token')
    //         reject(err)
    //       })
    //   })
    // },
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
      });
    },
    login({ commit, state }, login) {
      commit("auth_request", login);
      var Richiesta = {
        VersioneClient: "0.5.2",
        // IndirizzoIP: state.ipUtente,
        UserAgent: state.userAgentUtente,
        Url: state.url,
        JsonWebToken: state.jwtUtente,
        CodiceClient: "reevolacerba2020",
        CodiceRichiesta: state.CodiceRichiesta,
        JsonRichiesta: JSON.stringify(login)
      };
      axios({
        url: "/",
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        params: JSON.stringify(Richiesta)
      }).then(res => {
        const user = JSON.parse(res.data.JsonRisposta);
        const jwtUtente = user.JsonWebToken;
        console.log(user);
        console.log(jwtUtente);
        if (user.IsAutorizzato) {
          commit('auth_success', jwtUtente)
          axios.defaults.headers.common['Authorization'] = jwtUtente
        }
        else {
          commit('auth_error');
        }

      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("jwtUtente");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  },
  modules,
  getters,
  plugins: [
    createPersistedState({
      key: "frog-admin"
    })
  ]
});

export default _store;
