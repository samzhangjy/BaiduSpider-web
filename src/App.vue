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
    console.log(`   ___       _    __     ____     _    __
  / _ )___ _(_)__/ /_ __/ __/__  (_)__/ /__ ____
 / _  / _ \`/ / _  / // /\\ \\/ _ \\/ / _  / -_) __/
/____/\\_,_/_/\\_,_/\\_,_/___/ .__/_/\\_,_/\\__/_/
                         /_/
加入我们：samzhang951@outlook.com`)
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
