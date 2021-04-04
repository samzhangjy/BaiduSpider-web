<template>
  <div class="bd-navbar">
    <bd-container>
      <div class="bd-navbar-left">
        <router-link to="/">
        <img src="../assets/favicon.png" class="bd-navbar-logo">
        </router-link>
        <bd-inputbox v-model="query" class="bd-navbar-search">
          <bd-button @click="searchWeb" type_="submit">搜索</bd-button>
        </bd-inputbox>
      </div>
    </bd-container>
  </div>
</template>

<script>
export default {
  name: 'bd-navbar',
  data: function () {
    return {
      query: ''
    }
  },
  props: {
    part: {
      default: 'web',
      type: String
    }
  },
  created: function () {
    this.query = this.$route.query.q
  },
  methods: {
    searchWeb: function () {
      if (!this.query) {
        return
      }
      this.$router.push({
        path: `/search/${this.part}`,
        query: {
          q: this.query,
          pn: 1
        }
      })
    }
  },
  watch: {
    '$route.query.q': function () {
      this.query = this.$route.query.q
    }
  }
}
</script>
