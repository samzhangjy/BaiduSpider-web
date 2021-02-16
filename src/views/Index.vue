<template>
  <bd-container>
    <div class="text-center" style="margin-top: 100px">
      <img src="../assets/favicon.png" width="100" />
      <div style="margin-top: 30px"></div>
      <bd-inputbox v-model="query">
        <bd-button @click="searchWeb" type_="submit">搜索</bd-button>
      </bd-inputbox>
    </div>
  </bd-container>
</template>

<script>
export default {
  name: 'Index',
  data: function () {
    return {
      query: ''
    }
  },
  methods: {
    searchWeb: function () {
      if (!this.query) {
        return
      }
      this.$router.push({
        path: '/search/web',
        query: {
          q: this.query,
          pn: 1
        }
      })
    }
  }
}
</script>
