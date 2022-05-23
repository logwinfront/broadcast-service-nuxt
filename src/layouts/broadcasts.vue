<template>
  <div>
    <TheHeaderWrapper />
    <Nuxt />
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from '~/src/components/footer/TheFooter'
import TheHeaderWrapper from '~/src/components/header/TheHeaderWrapper'
export default {
  name: 'LayoutBroadcasts',
  components: { TheHeaderWrapper, TheFooter },
  layout: 'broadcasts',
}
</script>

<style scoped></style>
