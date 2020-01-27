import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import auth from './auth'

Vue.use(Vuex);

const modulesFiles = require.context('./modules', false, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules
}, {});

const _store = new Vuex.Store({
  modules,
  getters,
  auth,
  plugins: [createPersistedState({
    key: 'frog-admin'
  })]
});


export default _store;
