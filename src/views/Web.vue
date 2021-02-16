<template>
  <div>
    <bd-navbar />
    <br /><br /><br /><br />
    <div class="text-center center" style="width: 30%" v-if="loading">
      <bd-card
        class="bd-card-abs"
        style="width: 20%; height: 100px"
        title="<box-icon name='loader-alt' animation='spin' size='lg' color='#4E6EF2'></box-icon>"
        subtitle="Loading..."
      />
    </div>
    <bd-container style="margin: 10px 50px 10px 50px" v-if="!loading">
      <p class="text-secondary">BaiduSpider共找到搜索结果约{{ total }}个</p>
      <bd-card
        v-if="resultsCalc.result"
        :title="resultsCalc.result"
        :subtitle="resultsCalc.process"
        flip="true"
        bottom="计算"
      >
      </bd-card>
      <div :key="resultId">
      <div v-for="(result, index) in resultsNormal" :key="index">
        <h3>
          <a :href="result.url" target="_blank">
            {{ result.title }}
          </a>
        </h3>
        <p class="des">
          <span v-if="result.time" class="text-secondary" style="font-size: 100%">
            {{ result.time }}
          </span>
          {{ result.des }}
        </p>
        <p class="text-secondary">
          {{ result.origin }}
        </p>
      </div>
      </div>
    </bd-container>
    <div style="background-color: #F5F5F6; height: 110px; margin-top: 50px" v-if="!loading">
      <bd-container>
        <bd-pagination :pages="pages" :isFirst="curPage == 1" :curPage="curPage" :query="query">
        </bd-pagination>
        <a href="https://github.com/BaiduSpider/BaiduSpider" target="_blank" style="color: #999">
          GitHub
        </a>
        <span style="margin-left: 20px"></span>
        <a href="https://github.com/samzhangjy/BaiduSpider-web" target="_blank" style="color: #999">
          网页版
        </a>
      </bd-container>
    </div>
  </div>
</template>

<script>
import SearchService from '../services/SearchService'

export default {
  name: 'Web',
  data: function () {
    return {
      resultsNormal: [],
      resultsCalc: {},
      resultsNews: {},
      resultsVideo: {},
      resultsBaike: {},
      results: {
        results: [
          { result: 0 }
        ]
      },
      resultId: 0,
      query: '',
      loading: true,
      total: 0,
      pages: [],
      curPage: 0
    }
  },
  created: function () {
    this.query = this.$route.query.q
    this.curPage = Number(this.$route.query.pn)
    this.getResults()
  },
  methods: {
    getResults: async function () {
      this.loading = true
      await SearchService.searchWeb(this.query, this.curPage).then((data) => {
        this.pages = []
        this.resultsNormal = []
        this.resultsCalc = {}
        this.resultsNews = []
        this.resultsVideo = []
        this.resultsBaike = {}
        this.results = data.data.results
        for (var i = 0; i < this.results.results.length; i++) {
          if (this.results.results[i].type === 'result') {
            this.resultsNormal.push(this.results.results[i])
          } else if (this.results.results[i].type === 'calc') {
            this.resultsCalc = this.results.results[i]
          } else if (this.results.results[i].type === 'news') {
            this.resultsNews = this.results.results[i].results
          } else if (this.results.results[i].type === 'video') {
            this.resultsVideo = this.results.results[i].results
          } else if (this.results.results[i].type === 'baike') {
            this.resultsBaike = this.results.results[i].result
          } else if (this.results.results[i].type === 'total') {
            this.total = this.results.results[i].result
          }
        }
        this.resultId += 1
        this.loading = false
        this.getPages()
        console.log(this.results)
      })
    },
    getPages: function () {
      for (var i = this.results.total - 9; i <= this.results.total; i++) {
        this.pages.push({
          url: `/search/web?q=${encodeURIComponent(this.query)}&pn=${i}`,
          pn: i
        })
      }
    }
  },
  watch: {
    '$route.query.q': function () {
      this.query = this.$route.query.q
      this.curPage = Number(this.$route.query.pn)
      this.getResults()
    },
    '$route.query.pn': function () {
      this.query = this.$route.query.q
      this.curPage = Number(this.$route.query.pn)
      this.getResults()
    },
  }
}
</script>
