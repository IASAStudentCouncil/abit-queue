import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async addPersonToQueue({}, { number }) {
        axios
        .get(`/api/queue-add/?num=${number}`)
    },
    async deletePersonFromQueue({}, {number}) {
        axios
        .get(`/api/queue-del/?num=${number}`)
    },
    async fetchQueue() {
      try {
        const queue = axios.get(`/api/queue-fetch/`)
            .then(response => {
                return response.data
            })
        return queue /*? Object.keys(queue).map(key => ({ ...queue[key], id: key })) : []*/
      } catch (e) {
        throw e
      }
    }
  },
  modules: {
    auth
  }
})
