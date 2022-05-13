<template>
  <div class="sticky top-0 bg-blue-800 z-10 py-2">
    <div class="lg:container mx-auto">
      <div class="w-full flex items-center">
        <nuxt-link
          :to="{ name: 'home' }"
          class="flex items-center no-underline"
        >
          <img
            class="mr-2.5 h-12"
            src="../../assets/images/logo.svg"
            alt="logo"
          />
          <div
            class="font-semibold text-xl text-secondary flex flex-col leading-5"
          >
            <span>SPORT</span>
            <span>EFIR.COM</span>
          </div>
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
              :to="link.to"
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
        { name: 'Главная', to: { name: 'home' } },
        // { name: 'Login', to: { name: 'login' }  },
        {
          name: 'Футбол',
          to: { name: 'sport', params: { sport: 'football' } },
        },
        { name: 'Хоккей', to: { name: 'sport', params: { sport: 'hockey' } } },
        {
          name: 'Баскетбол',
          to: { name: 'sport', params: { sport: 'basketball' } },
        },
        { name: 'Новости', to: { name: 'news' } },
      ]
    },
  },
}
</script>

<style lang="scss"></style>
