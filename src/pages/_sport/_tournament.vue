<template>
  <TheTranslationsWrapper :current-date="currentDate">
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
export default {
  name: 'SportPage',
  components: { TheDateSlider, TheBroadcastsTable, TheTranslationsWrapper },
  layout: 'grid',
  data() {
    return {
      currentDate: new Date(new Date().setUTCHours(0, 0, 0, 0)).getTime(),
    }
  },
  methods: {
    updateCurrentDate(val) {
      this.currentDate = val
    },
  },
}
</script>

<style scoped></style>
