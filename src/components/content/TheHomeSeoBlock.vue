<template>
  <div class="q-pb-md q-py-xl">
    <div class="seo-block">
      <h1
        v-if="title"
        class="text-white text-lg lg:text-2xl font-bold mt-0 mb-1 lg:mb-4"
      >
        {{ title }}
      </h1>

      <div class="text-gray-200" :class="classes" v-html="text"></div>
      <p
        class="font-medium text-white text-center cursor-pointer"
        @click="updateShowFullText(!showFullText)"
      >
        {{ textButton }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHomeSeoBlock',
  props: {
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showFullText: false,
    }
  },
  computed: {
    classes() {
      return this.showFullText ? '' : 'line-clamp-5'
    },
    textButton() {
      return this.showFullText ? this.$t('collapse') : this.$t('expand')
    },
  },
  methods: {
    updateShowFullText(value) {
      this.showFullText = value
    },
  },
}
</script>

<style lang="scss">
.seo-block {
  p {
    font-size: 15px;
    line-height: 22px;
    margin-top: 8px;
    margin-bottom: 0;
  }
}
</style>
