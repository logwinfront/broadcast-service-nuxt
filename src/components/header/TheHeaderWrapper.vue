<template>
  <div class="sticky top-0 z-20">
    <TheHeader
      :active="active"
      :links="links"
      @update-mobile-menu="updateMobileMenuStatus"
    />
    <TheMobMenu
      :links="links"
      :active="active"
      @hide-menu="() => updateMobileMenuStatus(false)"
    />
  </div>
</template>

<script>
import TheHeader from '~/src/components/header/TheHeader'
import TheMobMenu from '~/src/components/header/TheMobMenu'
export default {
  name: 'TheHeaderWrapper',
  components: { TheMobMenu, TheHeader },
  data() {
    return {
      active: false,
      links: [
        { name: this.$t('home'), link: '/' },
        { name: this.$t('news'), link: '/news/' },
        { name: this.$t('articles'), link: '/articles/' },
        { name: this.$t('faq'), link: '/faq/' },
        { name: this.$t('contacts'), link: '/contacts/' },
      ],
    }
  },
  watch: {
    active(value) {},
  },
  methods: {
    updateMobileMenuStatus(value) {
      this.active = value
      if (value) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    },
  },
}
</script>

<style scoped></style>
