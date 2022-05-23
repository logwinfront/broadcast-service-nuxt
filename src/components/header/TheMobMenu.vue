<template>
  <div
    v-if="active"
    class="menu w-full h-screen bg-blue-800 z-10 absolute right-0 transition-transform px-4 lg:px-3 pt-3"
    :class="active ? '' : 'translate-x-full'"
  >
    <div class="border-t border-gray-700"></div>
    <ul class="text-white text-lg font-bold">
      <li v-for="item in links" :key="item.link" class="py-2">
        <nuxt-link :to="localePath(item.link)" @click.native="hideMenu">{{
          item.name
        }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TheMobMenu',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    links: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    hideMenu() {
      this.$emit('hide-menu')
    },
  },
}
</script>

<style scoped></style>
