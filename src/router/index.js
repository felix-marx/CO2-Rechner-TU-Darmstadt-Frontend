import Vue from 'vue'
import VueRouter from 'vue-router'
import Umfrage from '../components/umfrage.vue'
//import Home from '../views/Home.vue'
import Anmeldung from '../components/Anmeldung.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Anmeldung',
    component: Anmeldung
  },
  {
    path: '/survey',
    name: 'umfrage',
    component: Umfrage,
    beforeEnter: (to, from, next) => {
      postCheckAnmeldung(next); 
    }
  },
  {
    path: '/survey/:umfrageID',
    name: 'MitarbeiterUmfrage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "mitarbeiterUmfrage" */ '../views/MitarbeiterUmfrageView.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminView.vue')
  },
  { path: "*",
  component: () => import(/* webpackChunkName: "pageNotFound" */ '../views/PageNotFound.vue') }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

async function postCheckAnmeldung(next) {
  //User input validation and set error message

  await fetch("http://localhost:9000/auth/pruefeSession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: getCookieAttribut('email'),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      //This is always the case when the backend returns a package
      if (data.status == "success") {
        next()
      }
    })
    .catch((error) => {
      //This is always the case when the backend returns nothing -> Timeout
      console.error("Error:", error)
    }); 
}


function checkIfCookieAttributExists(identifier) {
  return document.cookie
  .split(";")
  .some((item) => item.trim().startsWith(identifier))
}

function getCookieAttribut(identifier) {
  if(checkIfCookieAttributExists(identifier)) {
    console.log(document.cookie
      .split("; ")
      .find(row => row.startsWith(identifier))
      .split("=")[1])
    return document.cookie
      .split("; ")
      .find(row => row.startsWith(identifier))
      .split("=")[1]
  }
  return null
}


