<template>
  <div>
    <client-only>
      <template #placeholder>
        <div class="main-slider--placeholder mx-auto">
          <MainSliderItem v-if="slides.length" :slide="slides[0]" />
          <MainSliderItem v-else :slide="null" is-placeholder />
        </div>
      </template>
      <div v-if="!slides.length" class="main-slider--placeholder mx-auto">
        <MainSliderItem :slide="null" is-placeholder />
      </div>
      <swiper :navigation="true" :options="swiperOptions" class="main-slider">
        <swiper-slide v-for="item in slides" :key="`slide-${item.id}`">
          <MainSliderItem :slide="item" />
        </swiper-slide>
      </swiper>
    </client-only>
  </div>
</template>

<script>
import MainSliderItem from '~/src/components/sliders/main/MainSliderItem'

export default {
  name: 'MainSlider',
  components: { MainSliderItem },
  props: {
    slides: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      swiperOptions: {
        autoUpdate: true,
        observer: true,
        observeParents: true,
        loop: true,
        // cssMode: true,
        slidesPerView: 'auto',
        // centeredSlides: true,
        spaceBetween: 20,
        navigation: {
          nextEl: '.bl-casino__slider-nav--right',
          prevEl: '.bl-casino__slider-nav--left',
        },
        // dynamicBullets: false,
        // breakpoints: {
        //   1024: {
        //     slidesPerView: 3,
        //     spaceBetween: 24,
        //   },
        //   768: {
        //     slidesPerView: 2,
        //   },
        // },
      },
    }
  },

  computed: {},
  methods: {
    sliderIsReady() {
      console.log('sliderIsReady')
    },
  },
}
</script>

<style lang="scss">
$main-slider-width: 1240px;

.main-slider {
  .swiper-wrapper {
    width: $main-slider-width !important;
    margin: 0 auto;
  }
}

.main-slider--placeholder {
  width: $main-slider-width;
}
</style>
