import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VuePapaParse from 'vue-papa-parse'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'

Vue.config.productionTip = false

Vue.use(VuePapaParse)
Vue.use(VueKeyCloak, {
  init: {
    onLoad: 'check-sso',
  },
  config: {
    realm: 'co2Rechner',
    url: process.env.VUE_APP_KEYCLOAK_URL,
    clientId: 'vue-frontend',
  },
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
