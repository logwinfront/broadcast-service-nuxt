<template>
  <div></div>
</template>

<script>
import ApiService from '../plugins/api-service'

export default {
  name: 'TheTest',
  async fetch() {
    console.log(ApiService)
    const data = await ApiService.slider.getItems()
    console.log(data)
  },
}
</script>

<style scoped></style>
