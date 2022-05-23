<template>
  <div class="hover:bg-opacity-80">
    <nuxt-link v-if="item" :to="newsLink">
      <!--  bg  -->
      <div
        class="rounded-lg overflow-hidden bg-primary aspect-w-2 aspect-h-1 relative mb-1.5 cursor-pointer"
      >
        <div
          :style="imageStyle"
          class="absolute inset-0 bg-cover bg-center"
        ></div>
      </div>
      <!-- title  -->
      <div class="line-clamp-2">{{ item.name }}</div>
    </nuxt-link>

    <!--    <template v-if="item">-->
    <!--      <nuxt-link-->
    <!--        class="rounded overflow-hidden bg-primary"-->
    <!--        :to="localePath(newsLink)"-->
    <!--      >-->
    <!--        <div-->
    <!--          class="text-white ellipsis-3-lines font-bold line-clamp-2"-->
    <!--          :title="item.name"-->
    <!--        >-->
    <!--          {{ item.name }}-->
    <!--        </div>-->
    <!--      </nuxt-link>-->
    <!--      <div class="bg-primary-400 rounded overflow-hidden">-->
    <!--        <div-->
    <!--          class="absolute inset-0 bg-cover bg-center"-->
    <!--          :style="imageStyle"-->
    <!--        ></div>-->
    <!--      </div>-->
    <!--    </template>-->
    <!--    <template v-else>-->
    <!--      -->
    <!--    </template>-->
  </div>
</template>

<script>
export default {
  name: 'TheArticlesSliderItem',
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  computed: {
    imageStyle() {
      if (this.item?.preview_image) {
        return {
          backgroundImage: `url('${this.item.preview_image}')`,
        }
      }
      return null
    },

    newsLink() {
      return `/articles/${this.item.slug}`
    },
  },
}
</script>

<style lang="scss"></style>
