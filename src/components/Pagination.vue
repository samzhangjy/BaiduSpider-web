<template>
  <div class="bd-pagination">
    <bd-button v-if="!isFirst" color="white" @click="gotoPage(curPage - 1)">
      &lt; 上一页
    </bd-button>
    <bd-button
      v-for="(page, index) in pages"
      :key="index"
      @click="$router.push(page.url)"
      :color="curPage == page.pn ? 'primary' : 'white'"
      style="width: 38px"
    >
      {{ page.pn }}
    </bd-button>
    <bd-button color="white" @click="gotoPage(curPage + 1)">
      下一页 &gt;
    </bd-button>
  </div>
</template>

<script>export default {
  name: 'bd-pagination',
  props: {
    pages: Array,
    isFirst: Boolean,
    curPage: Number,
    query: String
  },
  methods: {
    gotoPage: function (pn) {
      this.$router.push({
        path: '/search/web',
        query: {
          q: this.query,
          pn: pn
        }
      })
    }
  }
}
</script>
