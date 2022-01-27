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

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Anmeldung',
    component: Anmeldung,
    // beforeEnter: (to, from, next) => {
    //   Cookies.postCheckUserRoleForLoginPage(next)
    // }
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
    component: MitarbeiterUmfrageView
  },
  {
    path: '/user/:userID',
    name: 'MailAuthentifizierung',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: MailAuthentifizierungVue
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
    component: PageNotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // //If user isnt logged in currently
  // if(Cookies.getCookieAttribut('username') != null && Cookies.getCookieAttribut('sessiontoken') != null){
  //     next('/survey')
  // }

  if(to.meta.requiresAuth) {
    // Authentication
    Authentication.postCheckLogin().then((data) => {
      //   This is always the case when the backend returns a package
      if (data.status == "success") {
        if(data.data.rolle === 1){
          next('/admin')
        } else if(data.data.rolle === 0){
          next()
        } else {
          next('/')
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
          next('/survey')
        } else {
          next('/')
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
  }
  next()
})

export default router