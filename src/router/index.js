import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Anmeldung from '../components/Anmeldung.vue'
import Cookies from '../Cookie.js'
import AdminView from '../views/AdminView.vue'
import PageNotFound from '../views/PageNotFound.vue'
import MitarbeiterUmfrageView from '../views/MitarbeiterUmfrageView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Anmeldung',
    component: Anmeldung,
    beforeEnter: (to, from, next) => {
      Cookies.postCheckUserRoleForLoginPage(next)
    }
  },
  {
    path: '/survey',
    name: 'umfrage',
    component: Home,
    beforeEnter: (to, from, next) => {
      Cookies.postCheckLogin(next)
    }
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
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AdminView,
    beforeEnter: (to, from, next) => {
      Cookies.postCheckUserRole(next)
    }
  },
  { 
    path: "*",
    component: PageNotFound
  }
]

const router = new VueRouter({
  routes
})

export default router