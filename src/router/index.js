import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/landingpage/Login.vue'
import Cookies from '../components/Cookie.js'
import AdminView from '../views/AdminView.vue'
import PageNotFound from '../views/PageNotFound.vue'
import ColleagueSurveyView from '../views/ColleagueSurveyView.vue'
import MailAuthentication from '../components/landingpage/MailAuthentication.vue'
import Authentication from './Authentication.js'
import PasswordReset from '../components/landingpage/PasswordReset.vue'
import EvaluationView from '../views/EvaluationView.vue'
import PrivacyPolicy from '../components/legal/PrivacyPolicy.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { loginPage: true }
  },
  {
    path: '/survey',
    name: 'Survey',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/survey/:umfrageID',
    name: 'ColleagueSurvey',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ColleagueSurveyView,
    meta: { noAuth: true }
  },
  {
    path: '/user/:nutzerID',
    name: 'MailAuthentication',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: MailAuthentication,
    meta: { noAuth: true }
  },
  {
    path: '/survey/results/:umfrageID',
    name: 'SurveyEvaluation',
    component: EvaluationView,
    meta: { noAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AdminView,
    meta: { requiresAdminAuth: true }
  },
  {
    path: "/passwortVergessen",
    component: PasswordReset,
    meta: {noAuth: true}
  },
  {
    path: "/datenschutz",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
    meta: {noAuth: true}
  },
  {
    path: "*",
    component: PageNotFound,
    meta: { noAuth: true } 
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.loginPage) {
    if(Cookies.getCookieAttribut('sessiontoken') === null && Cookies.getCookieAttribut('username') === null){
      next()
      return
    }
    // Authentication
    Authentication.postCheckLogin().then((data) => {
    //   This is always the case when the backend returns a package
    if (data.status == "success") {
          next({path: '/survey'})
        }
        else {
          Cookies.deleteCookieAttribut('username')
          Cookies.deleteCookieAttribut('sessiontoken')
          next(true)
        }
      }).catch((error) => {
        //This is always the case when the backend returns nothing -> Timeout
        console.error("Error:", error)
      });
  } else if(to.meta.requiresAuth) {
    // Authentication
    Authentication.postCheckLogin().then((data) => {
      //   This is always the case when the backend returns a package
      if (data.status == "success") {
        if(data.data.rolle === 1){
          next({path: '/admin'})
        } else if(data.data.rolle === 0){
          next()
        } else {
          next({path: '/'})
        }
      }
      else {
        Cookies.deleteCookieAttribut('username')
        Cookies.deleteCookieAttribut('sessiontoken')
        next({ path: '/' })
      }
    }).catch((error) => {
      //This is always the case when the backend returns nothing -> Timeout
      console.error("Error:", error)
    });
  } else if(to.meta.requiresAdminAuth){
     // Authentication
     Authentication.postCheckLogin().then((data) => {
      //   This is always the case when the backend returns a package
      if (data.status == "success") {
        if(data.data.rolle === 1){
          next()
        } else if(data.data.rolle === 0){
          next({path: '/survey'})
        } else {
          next({path: '/'})
        }
      }
      else {
        Cookies.deleteCookieAttribut('username')
        Cookies.deleteCookieAttribut('sessiontoken')
        next({ path: '/' })
      }
    }).catch((error) => {
      //This is always the case when the backend returns nothing -> Timeout
      console.error("Error:", error)
    });
  } else if(to.meta.noAuth){
    next()
  }
})

export default router