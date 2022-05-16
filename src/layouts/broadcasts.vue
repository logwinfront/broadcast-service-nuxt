<template>
  <div>
    <TheHeader />

    <Nuxt />
  </div>
</template>

<script>
import TheHeader from '../components/header/TheHeader.vue'
export default {
  name: 'LayoutBroadcasts',
  components: { TheHeader },
  layout: 'broadcasts',
}
</script>

<style scoped></style>
