import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Anmeldung from '../components/Anmeldung.vue'
import Cookies from '../Cookie.js'
import AdminView from '../views/AdminView.vue'
import PageNotFound from '../views/PageNotFound.vue'
import MitarbeiterUmfrageView from '../views/MitarbeiterUmfrageView.vue'
import MailAuthentifizierungVue from '../components/MailAuthentifizierung.vue'
import Authentication from '../Authentication.js'
import PasswortVergessen from '../components/PasswortVergessen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Anmeldung',
    component: Anmeldung,
    // beforeEnter: (to, from, next) => {
    //   Cookies.postCheckUserRoleForLoginPage(next)
    // }
    meta: { loginPage: true }
  },
  {
    path: '/survey',
    name: 'umfrage',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/survey/:umfrageID',
    name: 'MitarbeiterUmfrage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: MitarbeiterUmfrageView,
    meta: { noAuth: true }
  },
  {
    path: '/user/:nutzerID',
    name: 'MailAuthentifizierung',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: MailAuthentifizierungVue,
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
    path: "*",
    component: PageNotFound,
    meta: { noAuth: true } 
  },
  {
    path: "/passwortVergessen",
    component: PasswortVergessen,
    meta: {noAuth: true}
  }
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