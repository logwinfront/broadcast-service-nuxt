<template>
  <div class="news-slider-wrapper">
    <h2 class="text-white font-bold my-0 text-2xl">{{ $t('news') }}</h2>

    <client-only>
      <template #placeholder>
        <div class="flex gap-5 overflow-hidden">
          <TheNewsSliderItem
            v-for="n in 3"
            :key="`news-skeleton-${n}`"
            :item="null"
          />
        </div>
      </template>

      <div v-if="!items.length" class="flex gap-5 overflow-hidden">
        <TheNewsSliderItem
          v-for="n in 3"
          :key="`news-skeleton-${n}`"
          class="news-slider-skeleton"
          :item="null"
        />
      </div>

      <swiper v-else :options="sliderOptions">
        <swiper-slide v-for="(item, idx) in items" :key="`news-${idx}`">
          <TheNewsSliderItem :item="item" />
        </swiper-slide>
      </swiper>
    </client-only>
  </div>
</template>

<script>
import TheNewsSliderItem from '~/src/components/sliders/news/TheNewsSliderItem'
export default {
  name: 'TheNewsSlider',
  components: { TheNewsSliderItem },
  props: {
    items: {
      type: Array,
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
        slidesPerView: 3,
        spaceBetween: 20,
      },
    }
  },
}
</script>

<style lang="scss">
.news-slider-skeleton {
  width: calc(100% / 3 - (40px / 3));
}

.news-slider-wrapper {
  &__title {
  }

  .splide__pagination {
    bottom: -2em;
  }
}
</style>
