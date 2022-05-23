<template>
  <div class="news-slider-wrapper">
    <h2 class="text-white text-lg lg:text-2xl font-bold mt-0 mb-1 lg:mb-4">
      {{ $t('articles') }}
    </h2>

    <client-only>
      <template #placeholder>
        <div class="flex gap-5 overflow-hidden">
          <TheArticlesSliderItem
            v-for="n in 3"
            :key="`news-skeleton-${n}`"
            :item="null"
          />
        </div>
      </template>

      <div v-if="!items.length" class="flex gap-5 overflow-hidden">
        <TheArticlesSliderItem
          v-for="n in 3"
          :key="`news-skeleton-${n}`"
          class="news-slider-skeleton"
          :item="null"
        />
      </div>

      <swiper v-else :options="sliderOptions">
        <swiper-slide v-for="(item, idx) in items" :key="`news-${idx}`">
          <TheArticlesSliderItem :item="item" />
        </swiper-slide>
      </swiper>
    </client-only>
  </div>
</template>

<script>
import TheArticlesSliderItem from '~/src/components/sliders/articles/TheArticlesSliderItem'
export default {
  name: 'TheArticlesSlider',
  components: { TheArticlesSliderItem },
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
        slidesPerView: 1,
        spaceBetween: 16,
        breakpoints: {
          1260: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
          },
          575: {
            slidesPerView: 2,
          },
        },
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
