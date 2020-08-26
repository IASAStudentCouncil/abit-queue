<template>
  <div id="app">
    <router-view @update="updateQueue" :queue="queue" v-model="queue"/>
  </div>
</template>


<script>
import Admin from '@/views/Admin'
import Queue from '@/views/Queue'

export default {
  components:  { Admin, Queue },
  data: () => ({
    queue: []
  }),
  async mounted() {
     this.queue = await this.$store.dispatch('fetchQueue')
  },
  methods: {
    async updateQueue() {
      this.queue = await this.$store.dispatch('fetchQueue')
    }
  }
}
</script>