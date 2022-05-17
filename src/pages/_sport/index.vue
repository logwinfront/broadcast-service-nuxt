<template>
  <div>
    dsada
    <TheTranslationsWrapper>
      <template #default="scope">
        <TheBroadcastsTable
          :count="scope.count"
          :broadcasts="scope.broadcasts"
          :page="scope.page"
          :loading="scope.loading"
          @show-prev="scope.events.showPrev"
          @show-next="scope.events.showNext"
        />
      </template>
    </TheTranslationsWrapper>
  </div>
</template>

<script>
import TheTranslationsWrapper from '~/src/components/TheTranslationsWrapper'
import TheBroadcastsTable from '~/src/components/table/TheBroadcastsTable'
export default {
  name: 'SportPage',
  components: { TheBroadcastsTable, TheTranslationsWrapper },
  layout: 'grid',
}
</script>

<style scoped></style>
