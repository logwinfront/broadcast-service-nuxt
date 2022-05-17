<template>
  <swiper-slide class="tab-slider-item">
    <div
      class="h-24 rounded flex flex-col items-center justify-center px-4 py-2 hover:bg-primary-400 cursor-pointer"
      :class="[isActive ? 'bg-primary-400' : 'bg-primary']"
      @click="$emit('click', tab.slug)"
    >
      <!--      <img v-if="tab.logo" :src="getLogo(item.logo)" alt="">-->
      <div class="text-center overflow-hidden text-sm font-bold text-white">
        {{ tab.name }}
      </div>
    </div>
  </swiper-slide>
</template>

<script>
export default {
  name: 'TheTabsSliderItem',
  props: {
    tab: {
      type: Object,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.tab-slider-item {
  min-width: 9rem;
  width: 9rem !important;
}
</style>
