import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async addPersonToQueue({}, { number }) {
      const person = await firebase.database().ref(`/queue`).push({number})
      return { number, id: person.key }
    },
    async deletePersonFromQueue({}, {id}) {
      const person = await firebase.database().ref(`/queue/${id}`).set(null) 
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
    auth
  }
})
