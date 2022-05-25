<template>
  <TheNewsPageListWrapper type="articles">
    <template #sidebar>
      <TheSidebarNewsList
        :title="$t('popularArticles')"
        :news-list="popularArticles"
      />
    </template>
  </TheNewsPageListWrapper>
</template>

<script>
import TheNewsPageListWrapper from '~/src/components/news/TheNewsPageListWrapper'
import TheSidebarNewsList from '~/src/components/sidebar/TheSidebarNewsList'
import ApiService from '~/src/services/ApiService'

export default {
  name: 'ArticlesPageList',
  components: { TheSidebarNewsList, TheNewsPageListWrapper },
  async asyncData() {
    const response = await ApiService.article
      .list({ page_size: 10, ordering: '-watch_counter' })
      .catch((e) => {})

    if (response) {
      return { popularArticles: response.data.results }
    }
    return { popularArticles: [] }
  },
}
</script>

<style scoped></style>
