<template>
  <bd-container>
    <h1>Error 418.</h1>
    <h2><span class="text-secondary">我是一个茶壶。</span></h2>
    <p>
      这个服务器是一个茶壶，不是一台咖啡机。
    </p>
    <p>
      BaiduSpider为所有开发人员提供免费的大麦茶，无杂质，配方开放。
    </p>
    去
    <router-link to="/">
      喝一杯茶
    </router-link>
    或者
    <a href="https://github.com/BaiduSpider/BaiduSpider" target="_blank">
      查看配方
    </a>
    。
  </bd-container>
</template>

<script>
export default {
  name: 'Teapot'
}
</script>
