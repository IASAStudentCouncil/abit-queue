import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyCvnPhjVI_vLWHefcYwVzo-VGZi1x7oQbI",
  authDomain: "abit-queue.firebaseapp.com",
  databaseURL: "https://abit-queue.firebaseio.com",
  projectId: "abit-queue",
  storageBucket: "abit-queue.appspot.com",
  messagingSenderId: "642912729314",
  appId: "1:642912729314:web:d26605bbf8fa3ec8c146bb",
  measurementId: "G-8FJGSF1204"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
