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
  name: 'LayoutDefault',
  components: { TheFooter, TheHeader },
  layout: 'default',
}
</script>

<style scoped></style>
