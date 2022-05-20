<template>
  <div>
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '../components/header/TheHeader.vue'
import TheFooter from '~/src/components/footer/TheFooter'
export default {
  name: 'LayoutBroadcasts',
  components: { TheFooter, TheHeader },
  layout: 'broadcasts',
}
</script>

<style scoped></style>
