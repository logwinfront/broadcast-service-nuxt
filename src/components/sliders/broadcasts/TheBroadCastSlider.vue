<template>
  <div class="the-broadcast-slider">
    <h2 v-if="title" class="the-broadcast-slider__title">{{ title }}</h2>

    <client-only>
      <template #placeholder>
        <div class="flex gap-5 overflow-hidden">
          <TheBroadCastSliderItem
            v-for="item in items"
            :key="`slide-skeleton-${item.id}`"
            class="flex-shrink-0 the-broadcast-item-placeholder"
            :item="item"
          />
        </div>
      </template>

      <div v-if="!items.length" class="flex gap-5 overflow-hidden">
        <TheBroadCastSliderItem
          v-for="item in 4"
          :key="`slide-skeleton-${item}`"
          is-placeholder
          class="flex-shrink-0 the-broadcast-item-placeholder"
          :item="null"
        />
      </div>
      <swiper v-else :options="sliderOptions">
        <swiper-slide
          v-for="item in items"
          :key="`slide-${item.id}`"
          class="the-broadcast-item"
        >
          <TheBroadCastSliderItem :item="item" />
        </swiper-slide>
      </swiper>
    </client-only>
  </div>
</template>

<script>
import TheBroadCastSliderItem from '~/src/components/sliders/broadcasts/TheBroadCastSliderItem'
export default {
  name: 'TheBroadCastSlider',
  components: { TheBroadCastSliderItem },
  props: {
    items: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      sliderOptions: {
        freeMode: {
          enabled: true,
          sticky: true,
        },
        freeModeSticky: true,
        slidesPerView: 4,
        spaceBetween: 20,
      },
    }
  },
}
</script>

<style lang="scss">
.the-broadcast-item-placeholder {
  width: calc(25% - 15px);
}

.the-broadcast-slider {
  &__title {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    line-height: 3.75rem;
  }
}
</style>
