import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async addPersonToQueue({ number }) {
      const person = await firebase.database().ref(`/queue/${number}`).push({number})
      return { number, id: person.key }
    },
    async fetchQueue() {
      try {
        const queue = (await firebase.database().ref(`/queue`).once('value')).val()
        return queue ? Object.keys(queue).map(key => ({ ...queue[key], id: key })) : []
      } catch (e) {
        throw e
      }
    }
  },
  modules: {
  }
})
