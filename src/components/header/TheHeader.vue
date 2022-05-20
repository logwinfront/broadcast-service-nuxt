<template>
  <div class="sticky top-0 bg-blue-800 z-10 py-2">
    <div class="lg:container px-2.5 mx-auto">
      <div class="w-full flex items-center">
        <nuxt-link :to="localePath('/')" class="flex items-center no-underline">
          <img
            class="mr-2.5 h-12"
            src="../../assets/images/sportefir_1.svg"
            alt="logo"
          />
        </nuxt-link>

        <ul class="nav ml-auto flex items-center h-full">
          <li
            v-for="(link, idx) in navLinks"
            :key="`nl-${idx}`"
            class="nav-item"
          >
            <nuxt-link
              class="text-gray text-base font-semibold px-2.5"
              exact-active-class="text-white"
              :to="localePath(link.to)"
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
  computed: {
    navLinks() {
      return [
        { name: 'Главная', to: '/' },
        { name: this.$t('news'), to: '/news' },
      ]
    },
  },
}
</script>

<style lang="scss"></style>
