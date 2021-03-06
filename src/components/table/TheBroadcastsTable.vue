<template>
  <div
    class="bg-primary rounded p-2 lg:p-4 relative broadcast-table flex flex-col"
    :class="{ 'broadcast-table--loaded': !loading }"
  >
    <div
      v-if="loading"
      class="absolute inset-4 bg-primary bg-opacity-50 flex justify-center items-center rounded z-10"
    >
      <div
        class="w-8 h-8 lg:w-14 lg:h-14 border-b-2 lg:border-b-4 border-secondary rounded-full animate-spin"
      ></div>
    </div>

    <header v-if="title" class="pb-4 z-10">
      <nuxt-link
        v-if="titleLink"
        class="text-white font-semibold text-lg"
        :to="localePath(titleLink)"
        >{{ title }}</nuxt-link
      >
      <h3 v-else class="text-white font-semibold text-lg">{{ title }}</h3>
    </header>

    <main class="flex-1">
      <TheBroadcastsTableItem
        v-for="broadcast in broadcasts"
        :key="`broadcast-${broadcast.id}`"
        :broadcast="broadcast"
        :show-tournament="showTournament"
        class="border-b border-gray-700"
        :class="{ 'last:border-b-0': !showFooterLocal }"
      />
    </main>
    <footer
      v-if="showFooterLocal"
      class="w-full flex justify-end items-center text-white pt-4 pb-2 px-2"
    >
      <div class="text-sm">{{ paginationLabel }}</div>

      <div v-if="pagesNumber > 1" class="ml-3 flex item-center font-light">
        <Icon
          class="text-xl"
          :class="[hasPrev ? 'text-white cursor-pointer' : 'text-gray']"
          icon="ph:caret-left-light"
          @click.native="showPrev"
        />
        <Icon
          class="text-xl cursor-pointer"
          :class="[hasNext ? 'text-white cursor-pointer' : 'text-gray']"
          icon="ph:caret-right-light"
          @click.native="showNext"
        />
      </div>
    </footer>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import TheBroadcastsTableItem from '~/src/components/table/TheBroadcastsTableItem'
import { BROADCAST_PER_PAGE } from '~/src/utils/config'

export default {
  name: 'TheBroadcastsTable',
  components: { TheBroadcastsTableItem, Icon },
  props: {
    title: {
      type: String,
      default: null,
    },
    titleLink: {
      type: String,
      default: null,
    },
    broadcasts: {
      type: Array,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 1,
    },
    showTournament: {
      type: Boolean,
      default: true,
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showFooterLocal() {
      if (!this.showFooter) {
        return false
      }
      return this.pagesNumber > 1
    },
    pagesNumber() {
      return Math.ceil(this.count / BROADCAST_PER_PAGE)
    },
    hasPrev() {
      return this.page > 1
    },
    hasNext() {
      return this.page < this.pagesNumber
    },
    paginationLabel() {
      const start = (this.page - 1) * BROADCAST_PER_PAGE + 1
      const end =
        this.page * BROADCAST_PER_PAGE > this.count
          ? this.count
          : this.page * BROADCAST_PER_PAGE

      return `${start}-${end} из ${this.count}`
    },
  },

  methods: {
    showPrev() {
      if (!this.hasPrev) {
        return
      }
      this.$emit('show-prev')
    },
    showNext() {
      if (!this.hasNext) {
        return
      }
      this.$emit('show-next')
    },
  },
}
</script>

<style lang="scss">
.broadcast-table {
  &:not(.broadcast-table--loaded) {
    min-height: 130px;
  }
}
</style>
