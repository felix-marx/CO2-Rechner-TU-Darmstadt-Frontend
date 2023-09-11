import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/landingpage/Login.vue'
import AdminView from '../views/AdminView.vue'
import PageNotFound from '../views/PageNotFound.vue'
import ColleagueSurveyView from '../views/ColleagueSurveyView.vue'
import EvaluationView from '../views/EvaluationView.vue'
import PrivacyPolicy from '../components/legal/PrivacyPolicy.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { 
      loginPage: true 
    }
  },
  {
    path: '/survey',
    name: 'Survey',
    component: Home,
    meta: { 
      requiresAuth: true 
    }
  },
  {
    path: '/survey/:umfrageID',
    name: 'ColleagueSurvey',
    component: ColleagueSurveyView,
    meta: { 
      noAuth: true 
    }
  },
  {
    path: '/survey/results/:umfrageID',
    name: 'SurveyEvaluation',
    component: EvaluationView,
    meta: { 
      noAuth: true 
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { 
      requiresAdminAuth: true 
    }
  },
  {
    path: "/datenschutz",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
    meta: { 
      noAuth: true 
    }
  },
  {
    path: "*",
    component: PageNotFound,
    meta: { 
      noAuth: true 
    } 
  },
]

const router = new VueRouter({
  //mode: 'history',
  routes
})

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms))
// }

router.beforeEach((to, from, next) => {
  // We wait for Keycloak init, then we can call all methods safely
  // don't think is longer necessary but I leave it here just in case for now
  // while (router.app.$keycloak.createLoginUrl === null) {
  //   await sleep(100)
  // }

  if(to.meta.loginPage) {

    if(!router.app.$keycloak.authenticated){  // let user to login if not authenticated
      next()
    } else {    // redirect user if already logged in
      next({path: '/survey'})
    }

  } else if(to.meta.requiresAuth) {
    
    // let user through if authenticated
    if(router.app.$keycloak.authenticated){
      next()
      return
    } else {  // redirect user to login page if not authenticated
      next({path: '/'})
    }

  } else if(to.meta.requiresAdminAuth){
    if(router.app.$keycloak.authenticated){
      fetch(process.env.VUE_APP_BASEURL + "/nutzerdaten/checkRolle", {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + router.app.$keycloak.token,
        }
      }).then(response => response.json())
        .then(data => {
          if(data.data.rolle == 1) {
            next()
          } else if (data.data.rolle == 0){
            next({path: '/survey'})
          } else {
            next({path: '/'})
          }

      }).catch((error) => {
        console.error("Error:", error);
      });
    } else {
      next({path: '/'})
    }

  } else if(to.meta.noAuth){
    next()
  }
})

export default router