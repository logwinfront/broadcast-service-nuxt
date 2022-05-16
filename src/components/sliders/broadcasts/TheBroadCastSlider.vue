<template>
  <div class="the-broadcast-slider">
    <h2 v-if="title" class="the-broadcast-slider__title">{{ title }}</h2>

    <swiper :options="sliderOptions">
      <swiper-slide
        v-for="item in items"
        :key="`slide-${item.id}`"
        class="the-broadcast-item"
      >
        <TheBroadCastSliderItem :item="item" />
      </swiper-slide>
    </swiper>

    <!--    <Splide :options="splideOptions"-->
    <!--            aria-label="Название промо баннера"-->
    <!--    >-->
    <!--      <SplideSlide-->
    <!--        v-for="(item, idx) in items"-->
    <!--        :key="`broadcast-${idx}`"-->
    <!--        class="the-broadcast-item"-->
    <!--      >-->
    <!--        <TheBroadCastItem :item="item" />-->
    <!--      </SplideSlide>-->
    <!--    </Splide>-->
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
      required: true,
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
