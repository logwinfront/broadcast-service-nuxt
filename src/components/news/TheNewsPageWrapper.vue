<template>
  <TheGridLayoutWrapper>
    <TheBreadcrumbs
      :breadcrumbs="breadcrumbs"
      :title="newsHeading"
      :loading="$fetchState.pending"
      show-title
      class="mb-4"
    >
      <template #footer>
        <div class="pt-2 flex items-center justify-between">
          <template v-if="$fetchState.pending">
            <div class="h-3 w-24 bg-primary-400 rounded"></div>
            <div class="h-3 w-24 bg-primary-400 rounded"></div>
          </template>
          <template v-else>
            <div class="text-xs md:text-base text-gray">{{ createdDate }}</div>
            <div class="text-xs md:text-base text-gray">
              {{ $t('views') }}: {{ news.watch_counter }}
            </div>
          </template>
        </div>
      </template>
    </TheBreadcrumbs>

    <div class="p-3 md:p-4 rounded bg-primary">
      <div
        v-if="$fetchState.pending"
        class="h-96 relative flex justify-center items-center"
      >
        <div
          class="border-b-2 border-secondary rounded-full animate-spin absolute w-8 h-8 lg:w-12 lg:h-12"
        ></div>
      </div>
      <template v-else>
        <img
          v-if="news.preview_image"
          class="rounded w-full mb-4 md:mb-10 select-none"
          :src="news.preview_image"
          :alt="newsTitle"
        />
        <div
          class="news-content text-sm md:text-base"
          v-html="news.description"
        ></div>
      </template>
    </div>

    <template #sidebar-banner> sidebar </template>
  </TheGridLayoutWrapper>
</template>

<script>
import { ru, enGB } from 'date-fns/locale'
import { format } from 'date-fns'
import TheGridLayoutWrapper from '~/src/components/wrappers/TheGridLayoutWrapper'
import TheBreadcrumbs from '~/src/components/breadcrumbs/TheBreadcrumbs'
import ApiService from '~/src/services/ApiService'
const locales = { ru, enGB }

export default {
  name: 'TheNewsPageWrapper',
  components: { TheBreadcrumbs, TheGridLayoutWrapper },
  props: {
    type: {
      type: String,
      default: 'news',
    },
  },
  data() {
    return {
      news: null,
    }
  },

  async fetch() {
    const newsResult = await this.getNews().catch((e) => {
      this.$nuxt.error({
        statusCode: 404,
        message: this.$t('errors.pageNotFound'),
      })
    })

    const news = newsResult?.data ?? null
    if (news) {
      this.news = news
    }
  },

  head() {
    const meta = {}
    const title = this.news?.seo?.meta_title || this.news?.name || null
    const description =
      this.news?.seo?.meta_description || this.news?.short_description || null

    if (title) {
      meta.title = title
    }
    if (description) {
      meta.meta = [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
      ]
    }
    return meta
  },
  computed: {
    localeOptions() {
      return {
        locale: locales[this.$i18n.localeProperties.dateFnsCode],
      }
    },
    config() {
      return {
        breadcrumb: {
          news: { name: this.$t('news'), link: '/news' },
          articles: { name: this.$t('articles'), link: '/articles' },
        },
      }
    },
    breadcrumbs() {
      const additionalBreadcrumb = this.config.breadcrumb[this.type] ?? null

      return [
        { name: this.$t('home'), link: '/' },
        additionalBreadcrumb,
        { name: this.newsTitle },
      ]
    },
    imageStyle() {
      if (this.news?.preview_image)
        return { backgroundImage: `url('${this.news?.preview_image}')` }
      return null
    },
    newsTitle() {
      return this.news?.name ?? null
    },
    newsHeading() {
      return this.news?.seo?.header_h1 || this.news?.name || null
    },
    createdDate() {
      return format(new Date(this.news.created), 'PPPP', this.localeOptions)
    },
  },
  methods: {
    getNewsApi() {
      return ApiService.news.item(this.$route.params.slug)
    },
    getArticlesApi() {
      return ApiService.article.item(this.$route.params.slug)
    },
    getNews() {
      const functions = {
        news: this.getNewsApi,
        articles: this.getArticlesApi,
      }

      if (functions[this.type]) {
        return functions[this.type]()
      }
    },
  },
}
</script>

<style lang="scss">
.news-content {
  p {
    margin-bottom: 10px;
  }
}
</style>
