import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import Chartkick from 'vue-chartkick'
import Highcharts from 'highcharts'

Vue.use(Chartkick.use(Highcharts))
Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
