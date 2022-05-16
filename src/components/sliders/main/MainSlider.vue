<template>
  <client-only>
    <swiper :navigation="true" :options="swiperOptions" class="main-slider">
      <swiper-slide v-for="item in slides" :key="`slide-${item.id}`">
        <MainSliderItem :slide="item" />
      </swiper-slide>
    </swiper>
  </client-only>
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
        loop: true,
        // freeMode: {
        //   enabled: true,
        //   sticky: true,
        // },
        // freeModeSticky: true,
        slidesPerView: 'auto',
        centeredSlides: true,
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
.main-slider {
  .swiper-slide {
    width: 1240px;
  }
}
</style>
