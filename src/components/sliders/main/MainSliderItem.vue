<template>
  <div class="the-banner-item--wrapper rounded-lg">
    <div class="slider-stub"></div>
    <img class="the-banner-item__bg-image" :src="slide.image" alt="" />
    <div class="the-banner-item-info">
      <p class="the-banner-item__title">{{ title }}</p>
      <p class="the-banner-item__subtitle">{{ slide.sub_title }}</p>

      <TheButton :to="link" class="bg-secondary hover:bg-secondary-400" small>
        {{ linkText }}
      </TheButton>
    </div>
  </div>
</template>

<script>
import TheButton from '~/src/components/ui/TheButton'
export default {
  name: 'MainSliderItem',
  components: { TheButton },
  props: {
    slide: {
      type: Object,
      required: true,
    },
  },

  computed: {
    hasBroadCast() {
      return !!this.slide.broadcast
    },

    title() {
      if (this.slide.title) {
        return this.slide.title
      }

      if (this.hasBroadCast) {
        return this.slide.broadcast.title
      }

      return null
    },

    link() {
      if (this.slide.link) {
        return this.slide.link
      }

      if (this.hasBroadCast) {
        return { name: 'broadcast', params: { slug: this.slide.broadcast.id } }
      }

      return null
    },

    linkText() {
      if (this.slide.link_text) {
        return this.slide.link_text
      }

      if (this.hasBroadCast) {
        return 'Смотреть трансляцию'
      }

      return 'Подробнее'
    },
  },
}
</script>

<style lang="scss">
.the-banner-item {
  &--wrapper {
    height: 520px;
    //width: 1240px !important;
    width: 100%;
    padding: 0 15px;
    position: relative;
    //width: 100%;
    //height: 100%;
    //border-radius: $border-radius * 3;
    overflow: hidden;

    &:before {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      z-index: 1;
      background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.9) 0%,
        rgba(0, 0, 0, 0) 100%
      );
      height: 200px;
    }
  }

  .slider-stub {
    position: absolute;
    top: 0;
    z-index: -1;
    &:after {
      //background-color: $blue-darker;
    }
  }

  &__bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center bottom;
    transition: opacity 0.5s ease 0.2s;
    z-index: -1;
  }

  &-info {
    position: absolute;
    left: 25px;
    bottom: 25px;
    color: #fff;
    z-index: 1;
  }

  &__title {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 46px;
    font-weight: 700;
    text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.4);
  }

  &__subtitle {
    margin-bottom: 15px;
    font-size: 14px;
  }
}
</style>
