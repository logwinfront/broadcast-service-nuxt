<template>
  <div>
    <TheBreadcrumbs
      :breadcrumbs="breadcrumbs"
      :title="breadcrumbsTitle"
      show-title
      class="mb-4"
      :loading="loading.sport"
    />

    <TheDateSlider
      class="mb-6"
      :now-date="currentDate"
      @changeSelectedDate="updateCurrentDate"
    />

    <div class="relative">
      <TheNoDataBlock
        v-if="!tournaments.length"
        class="bg-primary rounded h-56 text-white"
        :error-title="$t('notFound.broadcasts')"
      />

      <div
        v-if="loading.broadcasts"
        class="bg-primary flex justify-center rounded absolute inset-0 z-10"
        :class="{
          'bg-opacity-50 pt-20': tournaments.length,
          'items-center': !tournaments.length,
        }"
      >
        <div
          class="w-8 h-8 lg:w-14 lg:h-14 border-b-2 lg:border-b-4 border-secondary rounded-full animate-spin"
        ></div>
      </div>

      <TheTranslationsWrapper
        v-for="tournament in tournaments"
        :key="tournament.id"
        :tournament="tournament"
        class="mb-4"
      >
        <template #table="scope">
          <TheBroadcastsTable
            :title="tournament.name"
            :title-link="tournamentLink(tournament)"
            :count="scope.count"
            :broadcasts="scope.broadcasts"
            :page="scope.page"
            :loading="scope.loading"
            :show-tournament="false"
            @show-prev="scope.events.showPrev"
            @show-next="scope.events.showNext"
          />
        </template>
      </TheTranslationsWrapper>
    </div>
  </div>
</template>

<script>
import TheTranslationsWrapper from '~/src/components/TheTranslationsWrapper'
import TheBroadcastsTable from '~/src/components/table/TheBroadcastsTable'
import ApiService from '~/src/services/ApiService'
import { getDateParams } from '~/src/utils/pure-functions'
import TheDateSlider from '~/src/components/sliders/dates/TheDateSlider'
import TheNoDataBlock from '~/src/components/error/TheNoDataBlock'
import TheBreadcrumbs from '~/src/components/breadcrumbs/TheBreadcrumbs'

export default {
  name: 'SportPage',
  components: {
    TheBreadcrumbs,
    TheNoDataBlock,
    TheDateSlider,
    TheBroadcastsTable,
    TheTranslationsWrapper,
  },
  layout: 'grid',
  data() {
    return {
      currentDate: new Date(new Date().setUTCHours(0, 0, 0, 0)).getTime(),
      tournaments: [],
      sport: null,
      loading: {
        broadcasts: false,
        sport: false,
      },
      init: false,
    }
  },
  async fetch() {
    // await this.getTournaments()
    // await this.getSportInfo()
    await Promise.all([this.getTournaments(), this.getSportInfo()])
    this.init = true
  },
  computed: {
    breadcrumbsTitle() {
      return this.sport?.header_h1 || this.sport?.name || null
    },
    breadcrumbs() {
      return [{ name: this.$t('home'), link: '/' }, { name: this.sport?.name }]
    },
    dateParamsForAPI() {
      return getDateParams(this.currentDate)
    },
    params() {
      return {
        ...this.dateParamsForAPI,
        page_size: 50,
        sport__slug: this.$route.params.sport,
      }
    },
  },
  watch: {
    currentDate() {
      this.getTournaments()
    },
  },
  methods: {
    tournamentLink(tournament) {
      return `/${this.$route.params.sport}/${tournament.slug}`
    },
    updateCurrentDate(val) {
      this.currentDate = val
    },
    async getTournaments() {
      this.loading.broadcasts = true
      const response = await ApiService.tournament
        .list(this.params)
        .catch((e) => {})

      this.tournaments = (response?.data ?? []).map((item) => item.tournament)
      this.loading.broadcasts = false
    },
    async getSportInfo() {
      this.loading.sport = true
      const response = await ApiService.sport
        .item(this.$route.params.sport)
        .catch((e) => {})
      this.sport = response?.data ?? null
      this.loading.sport = false
    },
  },
}
</script>

<style lang="scss"></style>
