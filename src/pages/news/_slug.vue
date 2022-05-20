<template>
  <div>
    <TheBreadcrumbs :breadcrumbs="breadcrumbs" :title="newsTitle" class="mb-4">
      <template #footer>
        <div class="pt-2 flex items-center justify-between">
          <div class="text-gray">{{ createdDate }}</div>
          <div class="text-gray">
            {{ $t('views') }}: {{ news.watch_counter }}
          </div>
        </div>
      </template>
    </TheBreadcrumbs>

    <div class="p-4 rounded bg-primary">
      <!--      <div-->
      <!--        v-if="imageStyle"-->
      <!--        class="aspect-w-16 aspect-h-6 bg-cover rounded"-->
      <!--        :style="imageStyle"-->
      <!--      ></div>-->
      <img
        v-if="news.preview_image"
        class="rounded w-full mb-10 select-none"
        :src="news.preview_image"
        :alt="newsTitle"
      />
      <div class="news-content" v-html="news.description"></div>
    </div>
  </div>
</template>

<script>
import { ru, enGB } from 'date-fns/locale'
import { format } from 'date-fns'
import TheBreadcrumbs from '~/src/components/breadcrumbs/TheBreadcrumbs'
import ApiService from '~/src/services/ApiService'
const locales = { ru, enGB }

export default {
  name: 'NewsPageList',
  components: { TheBreadcrumbs },
  layout: 'grid',
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
