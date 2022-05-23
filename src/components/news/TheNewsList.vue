<template>
  <div>
    <div
      class="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4 md:gap-x-4 md:gap-y-5"
    >
      <TheNewsItem v-for="item in news" :key="`news-${item.id}`" :item="item" />
    </div>

    <TheButton
      v-if="hasNext"
      class="bg-secondary mx-auto mt-6 md:mt-12"
      small
      :loading="loading"
      @click="loadMore"
      >{{ $t('showMore') }}
      <span v-if="leftCount > 0">({{ leftCount }})</span>
    </TheButton>
  </div>
</template>

<script>
import TheNewsItem from '~/src/components/news/TheNewsItem'
import TheButton from '~/src/components/ui/TheButton'
export default {
  name: 'TheNewsList',
  components: { TheButton, TheNewsItem },
  props: {
    news: {
      type: Array,
      default: () => [],
    },
    hasNext: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: null,
    },
  },
  computed: {
    leftCount() {
      return this.count - this.news.length
    },
  },
  methods: {
    loadMore() {
      this.$emit('load-more')
    },
  },
}
</script>

<style lang="scss"></style>
