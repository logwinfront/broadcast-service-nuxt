<template>
  <nuxt-link :to="localePath(newsLink)" class="group cursor-pointer">
    <div class="rounded bg-primary overflow-hidden mb-2 relative">
      <div
        class="aspect-w-16 aspect-h-11 bg-center bg-cover group-hover:scale-110 transition transition-transform"
        :style="imageStyle"
      ></div>
      <div
        class="py-0.5 px-2 bg-gray-700 bg-opacity-80 text-xs rounded absolute right-1 bottom-1 z-10"
      >
        {{ item.watch_counter }}
      </div>
      <div
        class="absolute p-2 md:p-4 flex flex-col justify-end inset-0 bg-black bg-opacity-0 invisible transition-colors group-hover:bg-opacity-80 group-hover:visible z-20"
      >
        <div
          class="text-xs md:text-sm text-opacity-70 opacity-0 leading-tight line-clamp-4 transition group-hover:opacity-100"
        >
          {{ item.short_description }}
        </div>
      </div>
    </div>
    <div
      class="line-clamp-2 text-xs md:text-sm lg:text-base text-gray group-hover:text-white transition-colors font-semibold"
    >
      {{ item.name }}
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'TheNewsItem',
  props: {
    item: {
      type: Object,
      default: null,
    },
    type: {
      type: String,
      default: 'news',
    },
  },
  computed: {
    imageStyle() {
      if (this.item?.preview_image) {
        return {
          backgroundImage: `url('${this.item?.preview_image}')`,
        }
      }
      return null
    },
    newsLink() {
      return `/${this.type}/${this.item.slug}`
    },
  },
}
</script>

<style lang="scss"></style>
