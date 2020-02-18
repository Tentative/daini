import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from "element-ui";
import './plugins/element-ui.js'
import './style/index.scss'
import './assets/ant-icon'
import axios from '@/plugins/axios'
import AsyncComputed from 'vue-async-computed'
import '@/plugins/vue-echarts'
import '@/plugins/frog-ui'
import VueClipboard from 'vue-clipboard2'
import { jumpTo } from '@/utils/routerUtils'
import commonPlugin from '@/plugins/common'
import VueRx from 'vue-rx'
import _ from 'lodash'
import store from './store'
import Axios from 'axios'
import locale from 'element-ui/lib/locale/lang/en'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.prototype.$http = Axios;
const jwtUtente = localStorage.getItem('jwtUtente') || sessionStorage.getItem('jwtUtente')
if (jwtUtente) {
	Vue.prototype.$http.defaults.headers.common['Authorization'] = jwtUtente
}


Vue.config.productionTip = false;

Vue.use(commonPlugin);
Vue.use(AsyncComputed);
Vue.use(VueClipboard);
Vue.use(VueRx);
Vue.use(ElementUI, { locale });


Vue.prototype.$vars = store.state.style.vars;
Vue.prototype.$themes = store.state.style.themes;
Vue.prototype.$apps = store.state.apps;
Vue.prototype.$jumpTo = jumpTo;
Vue.prototype.$routeState = store.state.routeState;
Vue.prototype.$loda = _;


Vue.prototype.$axios = axios;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
