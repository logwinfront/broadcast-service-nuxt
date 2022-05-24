<template>
  <div class="bg-blue-800 py-1 lg:py-2">
    <div class="lg:container px-4 lg:px-3 mx-auto">
      <div class="w-full flex items-center">
        <nuxt-link :to="localePath('/')" class="flex items-center no-underline">
          <img
            class="mr-2.5 h-9 lg:h-12"
            src="../../assets/images/sportefir_1.svg"
            alt="logo"
          />
        </nuxt-link>

        <div
          class="md:hidden space-y-2 ml-auto cursor-pointer"
          @click="updateMobileMenu"
        >
          <div class="w-6 h-0.5 bg-white"></div>
          <div class="w-6 h-0.5 bg-white"></div>
          <div class="w-6 h-0.5 bg-white"></div>
        </div>

        <ul class="hidden md:flex nav ml-auto items-center h-full">
          <li
            v-for="(link, idx) in links"
            :key="`nl-${idx}`"
            class="nav-item text-gray"
          >
            <nuxt-link
              class="lg:text-base font-semibold px-2.5"
              exact-active-class="text-white"
              :to="localePath(link.link)"
            >
              {{ link.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
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
  computed: {},
  methods: {
    updateMobileMenu() {
      this.$emit('update-mobile-menu', !this.active)
    },
  },
}
</script>

<style lang="scss"></style>
