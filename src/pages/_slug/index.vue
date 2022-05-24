<template>
  <div class="lg:container px-4 lg:px-3 mx-auto mb-6 lg:mb-20">
    <TheBreadcrumbs
      :breadcrumbs="breadcrumbs"
      :title="pageHeading"
      :loading="$fetchState.pending"
      show-title
      class="mb-4"
    />

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
          v-if="pageInfo.preview_image"
          class="rounded w-full mb-4 md:mb-10 select-none float-left"
          :src="pageInfo.preview_image"
          :alt="pageTitle"
        />
        <div
          class="news-content text-sm md:text-base"
          v-html="pageInfo.description"
        ></div>
      </template>
    </div>
  </div>
</template>

<script>
import ApiService from '~/src/services/ApiService'
import TheBreadcrumbs from '~/src/components/breadcrumbs/TheBreadcrumbs'

export default {
  name: 'CustomPage',
  components: { TheBreadcrumbs },
  data() {
    return {
      pageInfo: null,
    }
  },
  async fetch() {
    await Promise.all([this.getPageData()]).catch((e) => {
      this.$nuxt.error({
        statusCode: 404,
        message: this.$t('errors.pageNotFound'),
      })
    })
  },
  computed: {
    breadcrumbs() {
      return [{ name: this.$t('home'), link: '/' }, { name: this.pageTitle }]
    },
    pageTitle() {
      return this.pageInfo?.name ?? null
    },
    pageHeading() {
      return this.pageInfo?.seo?.header_h1 || this.pageInfo?.name || null
    },
  },
  methods: {
    async getPageData() {
      const response = await ApiService.page.item(this.$route.params.slug)
      this.pageInfo = response.data
    },
  },
}
</script>

<style lang="scss"></style>
