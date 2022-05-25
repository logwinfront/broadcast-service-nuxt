<template>
  <TheGridLayoutWrapper>
    <TheBreadcrumbs :breadcrumbs="breadcrumbs" :title="title" class="mb-4" />

    <TheNewsList
      :news="news"
      :type="type"
      :has-next="hasNext"
      :count="total"
      :loading="loading"
      @load-more="loadMore"
    />
    <template #sidebar-banner>
      <slot name="sidebar" />
    </template>
  </TheGridLayoutWrapper>
</template>

<script>
import TheBreadcrumbs from '~/src/components/breadcrumbs/TheBreadcrumbs'
import ApiService from '~/src/services/ApiService'
import TheNewsList from '~/src/components/news/TheNewsList'
import { NEWS_PER_PAGE } from '~/src/utils/config'
import TheGridLayoutWrapper from '~/src/components/wrappers/TheGridLayoutWrapper'

export default {
  name: 'TheNewsPageListWrapper',
  components: { TheGridLayoutWrapper, TheNewsList, TheBreadcrumbs },
  props: {
    type: {
      type: String,
      default: 'news',
    },
  },
  data() {
    return {
      loading: false,
      page: 1,
      news: [],
      total: 0,
    }
  },
  async fetch() {
    const { results, count } = await this.getNews()
    this.news = results
    this.total = count
  },
  computed: {
    config() {
      return {
        breadcrumb: {
          news: { name: this.$t('news') },
          articles: { name: this.$t('articles') },
        },
      }
    },
    title() {
      const configData = this.config.breadcrumb[this.type] ?? null
      if (configData) {
        return configData.name
      }
      return ''
    },
    breadcrumbs() {
      const additionalBreadcrumb = this.config.breadcrumb[this.type] ?? null

      return [{ name: this.$t('home'), link: '/' }, additionalBreadcrumb]
    },
    hasNext() {
      if (!this.news) {
        return false
      }
      return this.news.length < this.total
    },
  },
  methods: {
    async loadMore() {
      this.loading = true

      const API_FUNCTIONS = {
        news: ApiService.news.list,
        articles: ApiService.article.list,
      }

      if (!API_FUNCTIONS[this.type]) {
        return
      }

      const newsResult = await API_FUNCTIONS[this.type]({
        page_size: NEWS_PER_PAGE,
        page: ++this.page,
      }).catch((e) => {})

      const news = newsResult?.data.results ?? []
      this.news = this.news.concat(news)
      this.loading = false
    },
    getNewsApi(params = {}) {
      if (this.$store.getters['news/getNewsLoaded']) {
        const dataFromStore = this.$store.getters['news/getNewsObject']
        if (dataFromStore) {
          const { results, count } = dataFromStore
          this.news = results
          this.total = count
          return
        }
      }

      return ApiService.news.list(params).then(({ data }) => {
        this.$store.dispatch('news/setNewsInit', {
          data,
          loaded: true,
        })
        return data
      })
    },
    getArticlesApi(params = {}) {
      if (this.$store.getters['articles/getArticlesLoaded']) {
        const dataFromStore = this.$store.getters['articles/getArticlesObject']
        if (dataFromStore) {
          return dataFromStore
        }
      }

      return ApiService.article.list(params).then(({ data }) => {
        this.$store.dispatch('articles/setArticlesInit', {
          data,
          loaded: true,
        })
        return data
      })
    },
    getNews() {
      const functions = {
        news: this.getNewsApi,
        articles: this.getArticlesApi,
      }

      if (functions[this.type]) {
        const params = { page_size: NEWS_PER_PAGE }
        return functions[this.type](params)
      }
    },
  },
}
</script>

<style scoped></style>
