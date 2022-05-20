<template>
  <TheTranslationsWrapper :current-date="currentDate">
    <TheBreadcrumbs
      :breadcrumbs="breadcrumbs"
      :title="breadcrumbsTitle"
      show-title
      class="mb-4"
      :loading="loading.tournament"
    />

    <TheDateSlider
      class="mb-8"
      :now-date="currentDate"
      @changeSelectedDate="updateCurrentDate"
    />

    <template #table="scope">
      <TheBroadcastsTable
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
</template>

<script>
import TheTranslationsWrapper from '~/src/components/TheTranslationsWrapper'
import TheBroadcastsTable from '~/src/components/table/TheBroadcastsTable'
import TheDateSlider from '~/src/components/sliders/dates/TheDateSlider'
import TheBreadcrumbs from '~/src/components/breadcrumbs/TheBreadcrumbs'
import ApiService from '~/src/services/ApiService'
export default {
  name: 'SportPage',
  components: {
    TheBreadcrumbs,
    TheDateSlider,
    TheBroadcastsTable,
    TheTranslationsWrapper,
  },
  layout: 'grid',
  data() {
    return {
      currentDate: new Date(new Date().setUTCHours(0, 0, 0, 0)).getTime(),
      tournament: null,
      sport: null,
      loading: {
        tournament: true,
      },
    }
  },
  async fetch() {
    console.log('tournament fetch')
    await Promise.all([this.getSportInfo(), this.getTournamentInfo()]).catch(
      (e) => {
        console.log('error')
        this.$nuxt.error({
          statusCode: 404,
          message: this.$t('errors.pageNotFound'),
        })
      }
    )
  },
  computed: {
    breadcrumbsTitle() {
      return this.tournament?.header_h1 || this.tournament?.name || ''
    },
    breadcrumbs() {
      return [
        { name: this.$t('home'), link: '/' },
        { name: this.sport?.name, link: `/${this.sport?.slug}` },
        { name: this.tournament?.name },
      ]
    },
  },
  methods: {
    updateCurrentDate(val) {
      this.currentDate = val
    },
    async getTournamentInfo() {
      this.loading.tournament = true
      const response = await ApiService.tournament.list({
        tournament__slug: this.$route.params.tournament,
      })
      const tournamentData = response?.data?.[0]?.tournament ?? null
      if (!tournamentData) {
        throw new Error(this.$t('errors.pageNotFound'))
      }
      this.tournament = tournamentData
      this.loading.tournament = false
    },
    async getSportInfo() {
      const response = await ApiService.sport.item(this.$route.params.sport)
      this.sport = response?.data ?? null
    },
  },
}
</script>

<style scoped></style>
