<template>
  <div class="text-white">
    <TheBreadcrumbs
      :breadcrumbs="breadcrumbs"
      :title="breadcrumbsTitle"
      show-title
      class="mb-4"
      :loading="loading.broadcast"
    />

    <div class="broadcast-wrapper relative mb-24 bg-primary rounded">
      <div
        v-if="$fetchState.pending"
        class="bg-primary flex justify-center rounded absolute inset-0 items-center z-10"
      >
        <div
          class="w-8 h-8 lg:w-14 lg:h-14 border-b-2 lg:border-b-4 border-secondary rounded-full animate-spin"
        ></div>
      </div>
      <!--      <div v-else-if="$fetchState.error">asdsad</div>-->
      <template v-if="broadcast">
        <img
          v-if="broadcastData.image"
          class="broadcast__bg"
          :src="broadcastData.image"
          :alt="broadcastData.title"
        />
        <iframe
          v-else-if="broadcastLink"
          :src="broadcastLink"
          class="w-full h-full bg-primary-400 rounded bg-opacity-60"
          width="100%"
        ></iframe>
      </template>
    </div>
  </div>
</template>

<script>
import ApiService from '~/src/services/ApiService'
import TheBreadcrumbs from '~/src/components/breadcrumbs/TheBreadcrumbs'

export default {
  name: 'BroadCastPage',
  components: { TheBreadcrumbs },
  data() {
    return {
      broadcast: null,
      loading: {
        broadcast: true,
      },
    }
  },

  async fetch() {
    await Promise.all([this.getBroadcast()]).catch((e) => {
      this.$nuxt.error({
        statusCode: 404,
        message: this.$t('errors.pageNotFound'),
      })
    })
  },
  // async fetch() {
  //   await Promise.all([this.getBroadcast()]).catch((e) => {
  //     if (process.server) {
  //       this.$nuxt.context.res.statusCode = 404
  //     }
  //   })
  // },
  computed: {
    broadcastLink() {
      return this.broadcast?.broadcast_embeded
    },
    broadcastData() {
      return this.broadcast?.broadcast
    },
    breadcrumbsTitle() {
      return this.broadcastData?.header_h1 || this.broadcastData?.title || null
    },
    breadcrumbs() {
      const sportSlug = this.broadcastData?.sport?.slug
      const tournamentSlug = this.broadcastData?.tournament?.slug
      return [
        { name: this.$t('home'), link: '/' },
        { name: this.broadcastData?.sport?.name, link: `/${sportSlug}` },
        {
          name: this.broadcastData?.tournament?.name,
          link: `/${sportSlug}/${tournamentSlug}`,
        },
        { name: this.broadcastData?.title },
      ]
    },
  },
  methods: {
    async getBroadcast() {
      this.loading.broadcast = true
      const response = await ApiService.broadcasts.item(this.$route.params.id)

      this.broadcast = response?.data ?? null
      this.loading.broadcast = false
    },
  },
}
</script>

<style lang="scss">
.broadcast-wrapper {
  height: 500px;
}
</style>
