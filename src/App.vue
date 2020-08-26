<template>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
import Admin from '@/views/Admin'
import Queue from '@/views/Queue'

export default {
  components:  { Admin, Queue }
}
</script>