<template>
  <div>
    <bd-navbar part="news" />
    <br /><br /><br /><br />
    <bd-tab :links="links" :active="active">
    </bd-tab>
    <div class="text-center center" style="width: 30%" v-if="loading">
      <bd-card
        class="bd-card-abs"
        style="width: 20%; height: 100px"
        title="<box-icon name='loader-alt' animation='spin' size='lg' color='#4E6EF2'></box-icon>"
        subtitle="Loading..."
      />
    </div>
    <bd-container class="text-center" style="margin-top: 100px" v-if="!loading && error">
      <h1>出错了</h1>
      <hr /><br />
      <span>这很可能是一个BaiduSpider-api内部错误。请检查API日志，若为BaiduSpider内部错误，请</span>
      <a href="https://github.com/BaiduSpider/BaiduSpider/issues/new/choose" target="_blank">提交一个新的issue</a>。
    </bd-container>
    <bd-container style="margin: 10px 50px 10px 50px" v-if="!loading && !error">
      <div>
        <div :key="resultId">
          <div v-for="(result, index) in results" :key="index">
            <h3>
              <a :href="result.url" target="_blank">{{ result.title }}</a>
              <span v-if="result.author">
                <small class="text-secondary">&nbsp;&nbsp;{{ result.author }}</small>
              </span>
              <span v-if="result.date">
                <small class="text-secondary"><small>&nbsp;&nbsp;{{ result.date }}</small></small>
              </span>
            </h3>
            <p v-if="result.des">{{ result.des }}</p>
          </div>
        </div>
      </div>
    </bd-container>
  </div>
  <div class="bd-footer" v-if="!loading && !error">
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
</template>

<script>
import SearchService from '../services/SearchService'

export default {
  name: 'News',
  data: function () {
    return {
      results: [],
      resultId: 0,
      query: '',
      loading: true,
      total: 0,
      pages: [],
      curPage: 0,
      error: false,
      links: [],
      active: '资讯'
    }
  },
  created: function () {
    this.query = this.$route.query.q
    this.curPage = Number(this.$route.query.pn)
    document.title = `${this.query} - BaiduSpider`
    this.getResults()
  },
  methods: {
    getResults: async function () {
      this.loading = true
      await SearchService.searchNews(this.query, this.curPage, window.location.href).then((data) => {
        if (data == 'Error') {
          this.error = true
          this.loading = false
          return
        }
        this.pages = []
        this.error = false
        this.results = data.data.results.results
        this.total = data.data.results.total
        console.log(this.results)
        this.resultId += 1
        this.loading = false
        this.getPages()
        this.links = [
          {
            to: `/search/web?q=${this.query}&pn=1`,
            text: '网页',
            icon: 'search'
          },
          {
            to: `/search/news?q=${this.query}&pn=1`,
            text: '资讯',
            icon: 'news'
          },
          {
            to: `/search/video?q=${this.query}&pn=1`,
            text: '视频',
            icon: 'video'
          },
          {
            to: `/search/pic?q=${this.query}&pn=1`,
            text: '图片',
            icon: 'image-alt'
          },
          {
            to: `/search/zhidao?q=${this.query}&pn=1`,
            text: '知道',
            icon: 'help-circle'
          },
          {
            to: `/search/wenku?q=${this.query}&pn=1`,
            text: '文库',
            icon: 'book'
          }
        ]
      })
    },
    getPages: function () {
      for (var i = 1; i <= this.total; i++) {
        this.pages.push({
          url: `/search/news?q=${encodeURIComponent(this.query)}&pn=${i}`,
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
