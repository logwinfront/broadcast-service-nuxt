<template>
  <div>
    <slot />
    <slot
      name="table"
      :page="page"
      :broadcasts="broadcastsList"
      :count="broadcastsListTotal"
      :loading="loading.broadcasts"
      :events="{ showNext, showPrev }"
    />
  </div>
</template>

<script>
import { BROADCAST_PER_PAGE } from '~/src/utils/config'
import ApiService from '~/src/services/ApiService'
import { getDateParams } from '~/src/utils/pure-functions'

export default {
  name: 'TheTranslationsWrapper',
  props: {
    tournament: {
      type: Object,
      default: null,
    },
    currentDate: {
      type: Number,
      default: new Date(new Date().setUTCHours(0, 0, 0, 0)).getTime(),
    },
    broadcastsProp: {
      type: Array,
      default: null,
    },
    broadcastsTotalProp: {
      type: Number,
      default: null,
    },
    updateFromParent: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      page: 1,
      broadcasts: {},
      loading: {
        broadcasts: false,
      },
    }
  },
  async fetch() {
    if (this.broadcastsProp) {
      return
    }
    await this.getBroadcasts()
  },
  computed: {
    broadcastsList() {
      if (this.broadcastsProp) {
        return this.broadcastsProp
      }
      return this.broadcasts?.results ?? []
    },

    broadcastsListTotal() {
      if (this.broadcastsTotalProp) {
        return this.broadcastsTotalProp
      }
      return this.broadcasts?.count ?? 0
    },

    dateParamsForAPI() {
      return getDateParams(this.currentDate)
    },
    params() {
      const params = {
        ...this.dateParamsForAPI,
        page_size: BROADCAST_PER_PAGE,
      }

      if (this.$route.params.sport) {
        params.sport__slug = this.$route.params.sport
      }

      const tournament = this.tournament?.slug
        ? this.tournament?.slug
        : this.$route.params.tournament

      if (tournament) {
        params.tournament__slug = tournament
      }

      if (this.page > 1) {
        params.page = this.page
      }

      return params
    },
  },
  watch: {
    page() {
      this.getBroadcasts()
    },
    currentDate() {
      if (!this.updateFromParent) {
        return
      }
      this.page = 1
      this.getBroadcasts()
    },
  },
  methods: {
    showNext() {
      this.page++
    },
    showPrev() {
      this.page--
    },
    async getBroadcasts() {
      this.loading.broadcasts = true

      const response = await ApiService.broadcasts
        .list(this.params)
        .catch((e) => {})
      this.broadcasts = response?.data ?? {}
      this.loading.broadcasts = false
    },
  },
}
</script>

<style scoped></style>
