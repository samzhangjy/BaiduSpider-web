<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import '@/assets/lib/gridlex.min.css'

export default {
  name: 'App',
  created: function () {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
      if (event.matches) {
        document.getElementsByTagName('body')[0].classList.add('bd-dark')
      } else {
        if (document.getElementsByTagName('body')[0].classList.contains('bd-dark')) {
          document.getElementsByTagName('body')[0].classList.remove('bd-dark')
        }
      }
    })
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.getElementsByTagName('body')[0].classList.add('bd-dark')
    } else {
      if (document.getElementsByTagName('body')[0].classList.contains('bd-dark')) {
        document.getElementsByTagName('body')[0].classList.remove('bd-dark')
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
