import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import getters from "./getters";
import axios from "axios";
import { queueScheduler, onErrorResumeNext } from "rxjs";

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
    /* LOGIN */
    status: "",
    keepLogged: false,
    token: localStorage.getItem("token") || "",
    CodiceRichiesta: "",
    ipUtente: "",
    userAgentUtente: navigator.userAgent,
    url: window.location.href,
    // jwtUtente: localStorage.getItem('jwtUtente') || "",
    login: {
      NomeUtente: "",
      Password: "",
      IsMemorizzaPassword: null
    },
    user: {},
    /* AMZ */
    amz: {
      NumeroPagina: "1",
      ItemsPerPagina: "20",
      Categoria: null,
      FiltroAlert: "",
      FiltroInStock: "",
      FiltroFastTrack: "",
      FiltroBuyBox: "",
      FiltroNegativeReviews: ""
    }
  },
  mutations: {
    check_status(state) {
      state.status = "";
    },

    auth_request(state, login) {
      state.status = "loading";
      state.login = login;
      state.CodiceRichiesta = "Login";
    },
    amz_request(state, amz) {
      state.status = "";
      state.amz = amz;
      state.CodiceRichiesta = "AMZ";
    },
    amz_confirm(state, amzData) {
      state.amz = amzData;
    },
    auth_success(state, jwtUtente, user) {
      state.status = "success";
      state.user = user;
      state.jwtUtente = jwtUtente;
      if (state.login.IsMemorizzaPassword == false) {
        console.log("disconnesso al prossimo accesso");
        sessionStorage.setItem("jwtUtente", jwtUtente);
        state.jwtUtente = "";
      } else {
        localStorage.setItem("jwtUtente", jwtUtente);
      }
      window.location.reload(true);
    },
    temp_auth(state, user) {
      state.status = "success";
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      localStorage.removeItem("jwtUtente");
      sessionStorage.removeItem("jwtUtente");
      // window.location.reload(true);
    },
    request(state) {
      state.CodiceRichiesta = "";
    },
    keepLogged(state) {
      state.IsMemorizzaPassword = "";
    },
    get_address(state, ipUtente) {
      state.ipUtente = ipUtente;
    }
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
      return new Promise((resolve, reject) => {
        commit("auth_request", login);
        var Richiesta = {
          VersioneClient: "0.9.2",
          IndirizzoIP: state.ipUtente,
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
            "Content-Type": "application/json"
          },
          params: JSON.stringify(Richiesta)
        }).then(res => {
          const user = JSON.parse(res.data.JsonRisposta);
          const jwtUtente = user.JsonWebToken;
          if (user.IsAutorizzato == true) {
            commit("auth_success", jwtUtente, user);
            axios.defaults.headers.common["Authorization"] = jwtUtente;
            resolve(res);
          } else {
            commit("auth_error");
            localStorage.removeItem("jwtUtente");
          }
        });
      });
    },
    amazon({ state, commit }, amz) {
      new Promise((resolve, reject) => {
        commit("amz_request", amz);
        var Richiesta = {
          CodiceClient: "reevolacerba2020",
          CodiceRichiesta: state.CodiceRichiesta,
          JsonRichiesta: JSON.stringify(amz)
        };
        axios({
          url: "/",
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          params: JSON.stringify(Richiesta)
        }).then(res => {
          const amz_data = JSON.parse(res.data.JsonRisposta);
          const amzData = amz_data.JsonRisposta;
          console.log(amzData);
        });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
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
