import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/LandingPage.vue'
import AdminView from '@/views/AdminView.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import ColleagueSurveyView from '@/views/ColleagueSurveyView.vue'
import EvaluationView from '@/views/EvaluationView.vue'
import PrivacyPolicy from '@/components/footer/PrivacyPolicy.vue'
import FAQ from '@/components/footer/FAQ.vue'
import ShareSurvey from '@/views/ShareSurvey.vue'
import ChartTest from '@/components/charts/unused_Charttest.vue'


function surveyTabSelect(route) {
  let props = {}

  if(route.query.tab) {
    props = {
      tab: parseInt(route.query.tab)
    }
  }
  else {
    props = {
      tab: 0
    }
  }
  return props
}

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
    props: surveyTabSelect,
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
    path: "/faq",
    name: "FAQ",
    component: FAQ,
    meta: { 
      noAuth: true 
    }
  },
  {
    path: '/share/:umfrageID',
    name: 'ShareSurvey',
    component: ShareSurvey,
    meta: { 
      requiresAuth: true 
    }
  },
  {
    path: "/charts",
    component: ChartTest,
    meta: { 
      noAuth: true 
    } 
  },
  {
    path: "/:pathMatch(.*)*",
    component: PageNotFound,
    meta: { 
      noAuth: true 
    } 
  },
]

const router = new createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior (to) {
    if(!to.hash){
      window.scrollTo({
        top: 0, 
        left: 0
      })
    }
  }  
})

// beforeEach hook is in main.js

export default router