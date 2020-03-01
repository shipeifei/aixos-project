<template>
  <div id="app">
    <axiosStudy  />
  </div>
</template>

<script>
import axiosStudy from './components/axiosStudy.vue'

export default {
  name: 'App',
  components: {
    axiosStudy
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
