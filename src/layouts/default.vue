<template>
  <div>
    <TheHeader />

    <Nuxt />
  </div>
</template>

<script>
import TheHeader from '../components/header/TheHeader.vue'
export default {
  name: 'LayoutDefault',
  components: { TheHeader },
  layout: 'default',
}
</script>

<style scoped></style>
