<template>
  <div class="bg-primary rounded p-4">
    <p v-if="title" class="font-bold mb-2">{{ title }}</p>

    <TheSidebarNewsItem
      v-for="item in newsList"
      :key="item.slug"
      type="articles"
      class="mb-3.5"
      :news="item"
    />
  </div>
</template>

<script>
import TheSidebarNewsItem from '~/src/components/sidebar/TheSidebarNewsItem'
export default {
  name: 'TheSidebarNewsList',
  components: { TheSidebarNewsItem },
  props: {
    title: {
      type: String,
      default: null,
    },
    newsList: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped></style>
