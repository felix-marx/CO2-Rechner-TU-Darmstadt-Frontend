import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VuePapaParse from 'vue-papa-parse'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import i18n from './i18n'
import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';

Vue.config.productionTip = false

Vue.use(VuePapaParse)
Vue.use(VueKatex, {
  globalOptions: {
    throwOnError: true,
    displayMode: true,
  }
});

Vue.use(VueKeyCloak, {
  init: {
    onLoad: 'check-sso',
  },
  config: {
    realm: 'co2Rechner',
    url: process.env.VUE_APP_KEYCLOAK_URL,
    clientId: 'vue-frontend',
  },
  logout: {
    redirectUri: process.env.VUE_APP_KEYCLOAK_LOGOUT_URL,
  },
  onReady: async (keycloak) => {  // function is called after keycloak is initialized
    if(keycloak.authenticated) {  // check if account exists once a user is logged in
      await fetch(process.env.VUE_APP_BASEURL + "/nutzer/pruefeNutzer", {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + keycloak.token,
        }
      }).then(response => response.json())
        //.then(data => {})
        .catch((error) => {
        console.error("Error:", error);
      });
    }

    new Vue({
      i18n,
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});