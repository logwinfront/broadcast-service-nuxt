<template>
  <div>
    <TheBreadcrumbs
      :breadcrumbs="breadcrumbs"
      :title="$t('news')"
      class="mb-4"
    />

    <TheNewsList
      :news="news"
      :has-next="hasNext"
      :count="total"
      :loading="loading"
      @load-more="loadMore"
    />
  </div>
</template>

<script>
import TheBreadcrumbs from '~/src/components/breadcrumbs/TheBreadcrumbs'
import ApiService from '~/src/services/ApiService'
import TheNewsList from '~/src/components/news/TheNewsList'
import { NEWS_PER_PAGE } from '~/src/utils/config'
export default {
  name: 'NewsPageList',
  components: { TheNewsList, TheBreadcrumbs },
  layout: 'grid',
  async asyncData({ store }) {
    if (store.getters['news/getNewsLoaded']) {
      const dataFromStore = store.getters['news/getNewsObject']
      if (dataFromStore) {
        const { results, count } = dataFromStore
        return { news: results, total: count }
      }
    }

    const response = await ApiService.news
      .list({ page_size: 10 })
      .catch((e) => {})

    await store.dispatch('news/setNewsInit', {
      data: response?.data,
      loaded: true,
    })

    const news = response?.data.results ?? []
    const total = response?.data.count ?? 0
    return { news, total }
  },
  data() {
    return {
      loading: false,
      page: 1,
    }
  },
  computed: {
    breadcrumbs() {
      return [{ name: this.$t('home'), link: '/' }, { name: this.$t('news') }]
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
      const newsResult = await ApiService.news
        .list({
          page_size: NEWS_PER_PAGE,
          page: ++this.page,
        })
        .catch((e) => {})

      const news = newsResult?.data.results ?? []
      this.news = this.news.concat(news)
      this.loading = false
    },
  },
}
</script>

<style scoped></style>
