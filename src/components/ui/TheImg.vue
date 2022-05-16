<template>
  <img :src="filename" @error="onImgError" />
</template>

<script>
export default {
  name: 'TheImg',
  props: {
    src: {
      validator: (prop) => typeof prop === 'string' || prop === null,
      required: true,
    },
    defaultSrc: {
      type: String,
      default: '/images/no-team.svg',
    },
  },
  data() {
    return {
      imgError: false,
    }
  },
  computed: {
    filename() {
      return this.imgError || !this.src ? this.defaultSrc : this.src
    },
  },
  methods: {
    onImgError() {
      this.imgError = true
    },
  },
}
</script>

<style scoped></style>
