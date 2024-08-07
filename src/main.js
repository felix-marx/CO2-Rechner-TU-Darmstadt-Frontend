import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { useRouter } from 'vue-router'
import router from './plugins/router.js'
import VuePapaParse from 'vue-papa-parse'
import VueKeycloakJs from '@dsb-norge/vue-keycloak-js'
import i18n from './plugins/i18n.js'
import VueKatex from '@hsorby/vue3-katex';
import 'katex/dist/katex.min.css';

const app = createApp(App)

app.use(VuePapaParse)

app.use(VueKatex, {
  globalOptions: {
    throwOnError: true,
    displayMode: true,
  }
});

app.use(vuetify)

app.use(i18n)

app.use(VueKeycloakJs, {
  init: {
    onLoad: 'check-sso',
  },
  config: {
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    url: import.meta.env.VITE_KEYCLOAK_URL,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  },
  logout: {
    redirectUri: import.meta.env.VITE_KEYCLOAK_LOGOUT_URL,
  },
  onReady: async (keycloak) => {  // function is called after keycloak is initialized
    if(keycloak.authenticated) {  // check if account exists once a user is logged in
      await fetch(import.meta.env.VITE_BASEURL + "/nutzer/pruefeNutzer", {
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

    router.beforeEach((to, from, next) => {
      if(to.fullPath.includes("&")){  // preprocess of to if it contains &state=... from Keycloak as the new router does not handle it the same way
        let path = to.fullPath.split("&")[0]
        let matches = useRouter().resolve(path)

        return next({path: matches.fullPath})
      }

      if(to.meta.loginPage) {
        if(!keycloak.authenticated){  // let user to login if not authenticated
          return next()
        } else {    // redirect user if already logged in
          return next({path: '/admin'})
        }
    
      } else if(to.meta.requiresAuth) {
        
        // let user through if authenticated
        if(keycloak.authenticated){
          return next()
        } else {  // redirect user to keycloak to login
          const loginUrl = keycloak.createLoginUrl()
          window.location.replace(loginUrl)
        }
    
      } else if(to.meta.requiresAdminAuth){
        if(keycloak.authenticated){
          fetch(import.meta.env.VITE_BASEURL + "/nutzer/rolle", {
            method: 'GET',
            headers: {
              "Authorization": "Bearer " + keycloak.token,
            }
          }).then(response => response.json())
            .then(data => {
              if(data.data.rolle == 1) {
                return next()
              } else if (data.data.rolle == 0){
                return next({path: '/survey'})
              } else {
                return next({path: '/'})
              }
    
          }).catch((error) => {
            console.error("Error:", error);
          });
        } else {
          return next({path: '/'})
        }
    
      } else if(to.meta.noAuth){
        return next()
      }
    })

    app.use(router)

    app.provide('keycloak', keycloak) // provide keycloak instance to all components

    app.mount('#app') // TODO maybe pout this here

  }
});