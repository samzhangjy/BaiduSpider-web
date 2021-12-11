<template>
  <div>
    <bd-navbar />
    <br /><br /><br /><br />
    <bd-tab :links="links" :active="active"> </bd-tab>
    <div class="text-center center" style="width: 30%" v-if="loading">
      <bd-card
        class="bd-card-abs"
        style="width: 20%; height: 100px"
        title="<box-icon name='loader-alt' animation='spin' size='lg' color='#4E6EF2'></box-icon>"
        subtitle="Loading..."
      />
    </div>
    <bd-container
      class="text-center"
      style="margin-top: 100px"
      v-if="!loading && error"
    >
      <h1>出错了</h1>
      <hr />
      <br />
      <span
        >这很可能是一个BaiduSpider-api内部错误。请检查API日志，若为BaiduSpider内部错误，请</span
      >
      <a
        href="https://github.com/BaiduSpider/BaiduSpider/issues/new/choose"
        target="_blank"
        >提交一个新的issue</a
      >。
    </bd-container>
    <bd-container
      style="margin: 10px 50px 10px 50px"
      class="grid"
      v-if="!loading && !error"
    >
      <div :class="resultsExtra ? 'col-8' : ''">
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
          <div v-if="resultsNews">
            <h3>{{ query }}的相关新闻</h3>
            <div v-for="(result, index) in resultsNews" :key="index">
              <h4>
                <a :href="result.url" target="_blank">{{ result.title }}</a>
                <span v-if="result.author">
                  <small class="text-secondary"
                    >&nbsp;&nbsp;{{ result.author }}</small
                  >
                </span>
                <span v-if="result.time">
                  <small class="text-secondary"
                    >&nbsp;&nbsp;{{ result.time }}</small
                  >
                </span>
              </h4>
              <p v-if="result.des">{{ result.des }}</p>
            </div>
          </div>
          <div v-if="resultsVideo">
            <h3>{{ query }}的相关视频</h3>
            <div v-if="resultsVideo">
              <div class="grid">
                <bd-card
                  v-for="(result, index) in resultsVideo"
                  :key="index"
                  :class="`${
                    resultsExtra
                      ? 'col_md-6 col_lg-4 col_sm-12 col_xs-12'
                      : 'col_md-4 col_lg-3 col_sm-6 col_xs-12'
                  }`"
                  :title="result.title"
                  :url="result.url"
                  :cover="result.cover"
                  :subtitle="`${result.length}&nbsp;&nbsp;${result.origin}`"
                  coverType="imageFlip"
                >
                </bd-card>
              </div>
            </div>
          </div>
          <div v-for="(result, index) in resultsNormal" :key="index">
            <h3>
              <a :href="result.url" target="_blank">
                {{ result.title }}
              </a>
            </h3>
            <p class="des">
              <span
                v-if="result.time"
                class="text-secondary"
                style="font-size: 100%"
              >
                {{ result.time }}
              </span>
              {{ result.des }}
            </p>
            <p class="text-secondary">
              {{ result.origin }}
            </p>
          </div>
          <div v-if="resultsRelated">
            <bd-card coverType="imageFlip" title="相关搜索">
              <span
                v-for="(result, index) in resultsRelated"
                :key="index"
                style="margin-right: 15px; line-height: 30px"
              >
                <router-link
                  :to="`/search/web?q=${encodeURIComponent(result)}&pn=1`"
                >
                  {{ result }}
                </router-link>
              </span>
            </bd-card>
          </div>
        </div>
      </div>
      <div class="col-4 extra" v-if="resultsExtra">
        <bd-card
          v-if="resultsBaike"
          :title="resultsBaike.title"
          :subtitle="resultsBaike.des"
          :cover="resultsBaike.cover"
          :url="resultsBaike.url"
          :coverType="`${
            resultsBaike['cover-type'] ? resultsBaike['cover-type'] : 'none'
          }`"
        >
        </bd-card>
        <bd-card
          v-if="resultsTieba"
          :title="resultsTieba.title"
          :subtitle="resultsTieba.des"
          :cover="resultsTieba.cover"
          :url="resultsTieba.url"
          coverType="image"
        >
          <span class="text-secondary"
            >关注人数：{{ resultsTieba.followers }}</span
          >
          <span class="text-secondary"
            >&nbsp;&nbsp;累计发帖：{{ resultsTieba.total }}</span
          >
          <br /><br />
          <div v-for="(result, index) in resultsTieba.hot" :key="index">
            <a :href="result.url" target="_blank">
              {{ result.title }}
            </a>
            &nbsp;&nbsp;
            <span class="text-secondary"> 点击：{{ result.clicks }} </span>
            &nbsp;
            <span class="text-secondary"> 回复：{{ result.replies }} </span>
          </div>
          <br />
        </bd-card>
        <bd-card
          v-if="resultsBlog"
          :title="resultsBlog.title"
          :url="resultsBlog.url"
          coverType="none"
        >
          <div v-for="(result, index) in resultsBlog.blogs" :key="index">
            <a :href="result.url" target="_blank">
              {{ result.title }}&nbsp;&nbsp;
            </a>
            <span class="text-secondary" v-if="result.des">
              <br />{{ result.des }}&nbsp;&nbsp;
            </span>
            <span class="tag-primary" v-for="(tag, i) in result.tags" :key="i">
              {{ tag }}
            </span>
            <br />
          </div>
          <br />
        </bd-card>
        <bd-card
          v-if="resultsGitee"
          :title="resultsGitee.title"
          :subtitle="resultsGitee.des"
          :url="resultsGitee.url"
          coverType="none"
        >
          <div>
            <h4>简介</h4>
            <p v-if="resultsGitee.license">
              开源协议：{{ resultsGitee.license }}
            </p>
            <p v-if="resultsGitee.lang">开发语言：{{ resultsGitee.lang }}</p>
            <span> Star：{{ resultsGitee.star }}&nbsp;&nbsp; </span>
            <span> Fork：{{ resultsGitee.fork }}&nbsp;&nbsp; </span>
            <span> Watch：{{ resultsGitee.watch }} </span>
            <br />
            <h4>码云指数</h4>
            <img
              :src="resultsGitee.status"
              style="width: 100%"
              class="bd-img-need-dark"
            />
          </div>
          <br />
        </bd-card>
      </div>
    </bd-container>
  </div>
  <div class="bd-footer" v-if="!loading && !error">
    <bd-container>
      <bd-pagination
        :pages="pages"
        :isFirst="curPage == 1"
        :curPage="curPage"
        :query="query"
      >
      </bd-pagination>
      <a
        href="https://github.com/BaiduSpider/BaiduSpider"
        target="_blank"
        style="color: #999"
      >
        GitHub
      </a>
      <span style="margin-left: 20px"></span>
      <a
        href="https://github.com/samzhangjy/BaiduSpider-web"
        target="_blank"
        style="color: #999"
      >
        网页版
      </a>
    </bd-container>
  </div>
</template>

<script>
import SearchService from "../services/SearchService";

export default {
  name: "Web",
  data: function () {
    return {
      resultsNormal: [],
      resultsCalc: {},
      resultsNews: null,
      resultsVideo: null,
      resultsExtra: false,
      resultsBaike: null,
      resultsTieba: null,
      resultsBlog: null,
      resultsGitee: null,
      resultsRelated: null,
      results: {
        results: [{ result: 0 }],
      },
      resultId: 0,
      query: "",
      loading: true,
      total: 0,
      pages: [],
      curPage: 0,
      error: false,
      totalPages: 0,
      links: [],
      active: "网页",
    };
  },
  created: function () {
    this.query = this.$route.query.q;
    this.curPage = Number(this.$route.query.pn);
    document.title = `${this.query} - BaiduSpider`;
    this.getResults();
  },
  methods: {
    getResults: async function () {
      this.loading = true;
      await SearchService.searchWeb(
        this.query,
        this.curPage,
        window.location.href
      ).then((data) => {
        if (data == "Error") {
          this.error = true;
          this.loading = false;
          return;
        }
        this.pages = [];
        this.error = false;
        this.resultsNormal = [];
        this.resultsCalc = {};
        this.resultsNews = null;
        this.resultsVideo = null;
        this.resultsBaike = null;
        this.resultsTieba = null;
        this.resultsExtra = false;
        this.resultsBlog = null;
        this.resultsGitee = null;
        this.results = data.data.results;
        this.totalPages = parseInt(data.data.pages);
        for (var i = 0; i < this.results.length; i++) {
          if (this.results[i].type === "result") {
            this.resultsNormal.push(this.results[i]);
          } else if (this.results[i].type === "calc") {
            this.resultsCalc = this.results[i];
          } else if (this.results[i].type === "news") {
            this.resultsNews = this.results[i].results;
          } else if (this.results[i].type === "video") {
            this.resultsVideo = this.results[i].results;
          } else if (this.results[i].type === "baike") {
            this.resultsBaike = this.results[i].result;
            this.resultsExtra = true;
          } else if (this.results[i].type === "total") {
            this.total = this.results[i].result;
          } else if (this.results[i].type === "tieba") {
            this.resultsTieba = this.results[i].result;
            this.resultsExtra = true;
          } else if (this.results[i].type === "blog") {
            this.resultsBlog = this.results[i].result;
            this.resultsExtra = true;
          } else if (this.results[i].type === "gitee") {
            this.resultsGitee = this.results[i].result;
            this.resultsExtra = true;
          } else if (this.results[i].type === "related") {
            this.resultsRelated = this.results[i].results;
          }
        }
        this.resultId += 1;
        this.loading = false;
        this.getPages();
        this.links = [
          {
            to: `/search/web?q=${this.query}&pn=1`,
            text: "网页",
            icon: "search",
          },
          {
            to: `/search/news?q=${this.query}&pn=1`,
            text: "资讯",
            icon: "news",
          },
          {
            to: `/search/video?q=${this.query}&pn=1`,
            text: "视频",
            icon: "video",
          },
          {
            to: `/search/pic?q=${this.query}&pn=1`,
            text: "图片",
            icon: "image-alt",
          },
          {
            to: `/search/zhidao?q=${this.query}&pn=1`,
            text: "知道",
            icon: "help-circle",
          },
          {
            to: `/search/wenku?q=${this.query}&pn=1`,
            text: "文库",
            icon: "book",
          },
        ];
      });
    },
    getPages: function () {
      const cur = parseInt(this.$route.query.pn);
      for (
        var i = cur - 4 > 0 ? cur - 4 : 1;
        i <=
        ((cur + 5 <= this.totalPages ? cur + 5 : this.totalPages) < 10 &&
        this.totalPages >= 10
          ? 10
          : cur + 5 <= this.totalPages
          ? cur + 5
          : this.totalPages);
        i++
      ) {
        this.pages.push({
          url: `/search/web?q=${encodeURIComponent(this.query)}&pn=${i}`,
          pn: i,
        });
      }
    },
  },
  watch: {
    "$route.query.q": function () {
      this.query = this.$route.query.q;
      this.curPage = Number(this.$route.query.pn);
      this.getResults();
    },
    "$route.query.pn": function () {
      this.query = this.$route.query.q;
      this.curPage = Number(this.$route.query.pn);
      this.getResults();
    },
  },
};
</script>
