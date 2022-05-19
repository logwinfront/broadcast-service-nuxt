<template>
  <div>
    <MainSlider class="mt-3" :slides="mainSlider" />

    <div class="lg:container px-2.5 mx-auto mb-40">
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
        class="mb-8"
        @show-prev="page--"
        @show-next="page++"
      />

      <TheNewsSlider :items="news" />
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
import TheNewsSlider from '~/src/components/sliders/news/TheNewsSlider'

export default {
  name: 'IndexPage',
  components: {
    TheNewsSlider,
    TheBroadcastsTable,
    TheTabsSlider,
    TheDateSlider,
    TheBroadCastSlider,
    MainSlider,
  },
  data() {
    return {
      currentDate: new Date(new Date().setUTCHours(0, 0, 0, 0)).getTime(),
      news: [],
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
      if (this.$store.getters['main/getSliderLoaded'](params.slider__code)) {
        return this.$store.getters['main/getSliderList'](params.slider__code)
      }
      const response = await ApiService.slider.getItems(params).catch((e) => {})
      const data = response?.data?.results ?? []
      await this.$store.dispatch('main/updateSlider', {
        [params.slider__code]: { data, loaded: true },
      })
      return data
    }

    const getNews = async () => {
      // if  (this.$store.getters["main/getSliderLoaded"](params.slider__code)) {
      //   return this.$store.getters["main/getSliderList"](params.slider__code)
      // }
      const response = await ApiService.news
        .list({ page_size: 10 })
        .catch((e) => {})
      const data = response?.data?.results ?? []
      // await this.$store.dispatch('main/updateSlider', { [params.slider__code]: { data, loaded: true }})
      this.news = data
    }

    const mainSlider = async () => {
      this.mainSlider = await getSlides({
        active: true,
        slider__code: 'main',
        page_size: 20,
      })
    }

    const actualBroadcasts = async () => {
      this.actualBroadcasts = await getSlides({
        active: true,
        slider__code: 'actual_broadcasts',
        page_size: 20,
      })
    }

    await Promise.all([
      mainSlider(),
      actualBroadcasts(),
      this.getSports(),
      this.getBroadcasts(),
      getNews(),
    ])
  },
  head() {
    return {
      title: this.$t('seo.home.title'),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$t('seo.home.description'),
        },
      ],
    }
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
