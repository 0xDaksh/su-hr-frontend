// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'
import VueWebSocket from 'vue-socket-io'

Vue.prototype.api = 'localhost:8000'
Vue.use(Vuetify, {
  theme: {
    primary: '#7cb342',
    secondary: '#c1c5b0',
    accent: '#c6ff00',
    error: '#b71c1c'
  }
})
Vue.use(VueAxios, axios)
Vue.use(VueSession)
Vue.use(VueWebSocket, `//${Vue.prototype.api}`)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
