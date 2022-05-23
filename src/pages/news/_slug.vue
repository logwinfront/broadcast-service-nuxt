<template>
  <TheGridLayoutWrapper>
    <TheBreadcrumbs
      :breadcrumbs="breadcrumbs"
      :title="newsHeading"
      class="mb-4"
    >
      <template #footer>
        <div class="pt-2 flex items-center justify-between">
          <div class="text-xs md:text-base text-gray">{{ createdDate }}</div>
          <div class="text-xs md:text-base text-gray">
            {{ $t('views') }}: {{ news.watch_counter }}
          </div>
        </div>
      </template>
    </TheBreadcrumbs>

    <div class="p-3 md:p-4 rounded bg-primary">
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
    </div>

    <template #sidebar-banner> sidebar </template>
  </TheGridLayoutWrapper>
</template>

<script>
import { ru, enGB } from 'date-fns/locale'
import { format } from 'date-fns'
import TheBreadcrumbs from '~/src/components/breadcrumbs/TheBreadcrumbs'
import ApiService from '~/src/services/ApiService'
import TheGridLayoutWrapper from '~/src/components/wrappers/TheGridLayoutWrapper'
const locales = { ru, enGB }

export default {
  name: 'NewsPageList',
  components: { TheGridLayoutWrapper, TheBreadcrumbs },

  async asyncData({ params, error, app }) {
    const newsResult = await ApiService.news.item(params.slug).catch((e) => {
      error({ statusCode: 404, message: app.i18n.t('errors.pageNotFound') })
    })

    const news = newsResult?.data ?? null
    if (news) {
      return { news }
    }

    error({ statusCode: 404, message: app.i18n.t('errors.pageNotFound') })
  },
  data() {
    return {
      loading: false,
    }
  },

  head() {
    const meta = {}

    // header_h1:"Test heading h1"
    // meta_description:"Test description"
    // meta_title:"Test title"
    // seo_text:

    const title = this.news.seo?.meta_title || this.news.name || null
    const description =
      this.news.seo?.meta_description || this.news.short_description || null

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

    // return {
    //   title: this.$t('seo.home.title'),
    //   meta: [
    //     {
    //       hid: 'description',
    //       name: 'description',
    //       content: this.$t('seo.home.description'),
    //     },
    //   ],
    // }
  },
  computed: {
    localeOptions() {
      return {
        locale: locales[this.$i18n.localeProperties.dateFnsCode],
      }
    },
    breadcrumbs() {
      return [
        { name: this.$t('home'), link: '/' },
        { name: this.$t('news'), link: '/news' },
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
      return this.news.seo?.header_h1 || this.news?.name || null
    },
    createdDate() {
      return format(new Date(this.news.created), 'PPPP', this.localeOptions)
    },
  },
  methods: {},
}
</script>

<style lang="scss">
.news-content {
  p {
    margin-bottom: 10px;
  }
}
</style>
