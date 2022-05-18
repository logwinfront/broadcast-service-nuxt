<template>
  <div class="p-4 flex flex-col items-center justify-center">
    <Icon :icon="icon" class="text-7xl text-secondary" />

    <div class="mt-6 text-center">
      <div v-if="errorTitle" class="text-2xl">{{ errorTitle }}</div>
      <div v-if="errorMessage" class="text-lg">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
export default {
  name: 'TheNoDataBlock',
  components: { Icon },
  props: {
    icon: {
      type: String,
      default: 'ph:warning-light',
    },
    errorTitle: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped></style>
