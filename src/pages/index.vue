<template>
  <div>
    <MainSlider class="mt-3" :slides="mainSlider" />

    <div class="lg:container mx-auto mb-40">
      <TheBroadCastSlider
        class="pt-7 pb-4"
        :items="actualBroadcasts"
        :title="$t('actualBroadcasts')"
      />

      <TheDateSlider
        class="mb-8"
        :now-date="currentDate"
        @changeSelectedDate="updateCurrentDate"
      />

      <TheTabsSlider
        class="mb-8"
        :tabs="sportTabsForSlider"
        :active-tab="activeTab"
        @change-tab="changeTab"
      />

      <TheBroadcastsTable
        :broadcasts="broadcastsList"
        :count="broadcastsListTotal"
        :page="page"
        :loading="loading.broadcasts"
        @show-prev="page--"
        @show-next="page++"
      />
    </div>

    <div></div>
  </div>
</template>

<script>
import ApiService from '~/src/services/ApiService'
import MainSlider from '~/src/components/sliders/main/MainSlider'
import TheBroadCastSlider from '~/src/components/sliders/broadcasts/TheBroadCastSlider'
import TheDateSlider from '~/src/components/sliders/dates/TheDateSlider'
import TheTabsSlider from '~/src/components/sliders/sports/TheTabsSlider'
import { getDateParams } from '~/src/utils/pure-functions'
import TheBroadcastsTable from '~/src/components/table/TheBroadcastsTable'
import { BROADCAST_PER_PAGE } from '~/src/utils/config'

export default {
  name: 'IndexPage',
  components: {
    TheBroadcastsTable,
    TheTabsSlider,
    TheDateSlider,
    TheBroadCastSlider,
    MainSlider,
  },
  data() {
    return {
      currentDate: new Date(new Date().setUTCHours(0, 0, 0, 0)).getTime(),
      mainSlider: [],
      actualBroadcasts: [],
      broadcasts: {},
      sportTabs: [],
      activeTab: 'all',
      page: 1,
      loading: {
        broadcasts: false,
      },
    }
  },
  async fetch() {
    const getSlides = async (params) => {
      const response = await ApiService.slider.getItems(params).catch((e) => {})
      return response?.data?.results ?? []
    }

    this.mainSlider = await getSlides({
      active: true,
      slider__code: 'main',
      page_size: 50,
    })

    this.actualBroadcasts = await getSlides({
      active: true,
      slider__code: 'actual_broadcasts',
      page_size: 20,
    })

    await this.getSports()
    await this.getBroadcasts()
  },

  computed: {
    sportTabsForSlider() {
      return [{ name: this.$t('all'), slug: 'all' }, ...this.sportTabs]
    },

    dateParamsForAPI() {
      return getDateParams(this.currentDate)
    },

    broadcastsList() {
      return this.broadcasts?.results ?? []
    },

    broadcastsListTotal() {
      return this.broadcasts?.count ?? 0
    },
  },

  watch: {
    currentDate() {
      this.page = 1
      this.getSports()
      this.getBroadcasts()
    },
    activeTab() {
      this.page = 1
      this.getBroadcasts()
    },
    page() {
      this.getBroadcasts()
    },
  },

  methods: {
    changeTab(tab) {
      this.activeTab = tab
    },
    updateCurrentDate(val) {
      this.currentDate = val
    },
    async getSports() {
      const response = await ApiService.sport
        .list({ ...this.dateParamsForAPI, page_size: 100 })
        .catch((e) => {})
      const data = response?.data ?? []

      this.sportTabs = data.map((item) => item.sport)
    },
    async getBroadcasts() {
      this.loading.broadcasts = true
      const params = {
        ...this.dateParamsForAPI,
        page_size: BROADCAST_PER_PAGE,
      }
      if (this.activeTab !== 'all') {
        params.sport__slug = this.activeTab
      }
      if (this.page > 1) {
        params.page = this.page
      }

      const response = await ApiService.broadcasts.list(params).catch((e) => {})
      this.broadcasts = response?.data ?? {}
      this.loading.broadcasts = false
    },
  },
}
</script>
