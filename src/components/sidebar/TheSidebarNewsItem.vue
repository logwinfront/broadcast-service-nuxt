<template>
  <nuxt-link class="block group" :to="localePath(link)">
    <div class="text-sm text-gray-400 flex items-center">
      <p>{{ createdDate }}</p>
      <div class="ml-auto flex items-center">
        <Icon icon="ph:eye" class="mr-1" /> {{ news.watch_counter }}
      </div>
    </div>
    <p
      class="line-clamp-2 font-semibold text-sm text-gray-100 group-hover:underline"
    >
      {{ news.name }}
    </p>
  </nuxt-link>
</template>

<script>
import { ru, enGB } from 'date-fns/locale'
import { format } from 'date-fns'
import { Icon } from '@iconify/vue2'
const locales = { ru, enGB }

export default {
  name: 'TheSidebarNewsItem',
  components: { Icon },
  props: {
    news: {
      type: Object,
      default: null,
    },
    type: {
      type: String,
      default: 'news',
    },
  },
  computed: {
    link() {
      return `/${this.type}/${this.news.slug}`
    },
    localeOptions() {
      return {
        locale: locales[this.$i18n.localeProperties.dateFnsCode],
      }
    },
    createdDate() {
      return format(new Date(this.news.created), 'PPPp', this.localeOptions)
    },
  },
}
</script>

<style scoped></style>
