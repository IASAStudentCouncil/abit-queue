import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import numberFilter from './filters/number.filter'
import 'firebase/auth'

Vue.config.productionTip = false

Vue.filter('number', numberFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
