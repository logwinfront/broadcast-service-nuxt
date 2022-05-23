<template>
  <div
    class="the-banner-item--wrapper rounded-md overflow-hidden relative px-4"
  >
    <div class="slider-stub bg-primary"></div>
    <div
      v-if="image"
      class="the-banner-item__bg-image absolute inset-0 bg-cover bg-center"
      :style="imageStyle"
    />

    <!--    position: absolute;-->
    <!--    left: 25px;-->
    <!--    bottom: 25px;-->
    <!--    color: #fff;-->
    <!--    z-index: 1;-->

    <div class="absolute left-3 lg:left-3 bottom-3 lg:bottom-3 text-white z-10">
      <template v-if="!isPlaceholder">
        <!--        margin-top: 0;-->
        <!--        margin-bottom: 10px;-->
        <!--        font-size: 46px;-->
        <!--        font-weight: 700;-->

        <p class="text-lg lg:text-2xl font-bold">
          {{ title }}
        </p>

        <p v-if="subTitle" class="text-base lg:text-lg">
          {{ subTitle }}
        </p>

        <TheButton
          :to="localePath(link)"
          class="bg-secondary hover:bg-secondary-400 mt-3 lg:mt-4"
          small
        >
          {{ linkText }}
        </TheButton>
      </template>
      <template v-else>
        <div class="animate-pulse h-16 w-72 bg-primary rounded mb-2.5"></div>
        <div class="animate-pulse h-9 w-56 bg-secondary rounded"></div>
      </template>
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
      default: null,
    },
    isPlaceholder: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    image() {
      if (this.isPlaceholder) {
        return null
      }
      return this.slide?.image
    },

    imageStyle() {
      if (!this.image) {
        return {}
      }
      return { backgroundImage: `url('${this.image}')` }
    },

    hasBroadCast() {
      return !!this.slide?.broadcast
    },

    title() {
      if (this.isPlaceholder) {
        return null
      }
      if (this.slide?.title) {
        return this.slide.title
      }

      if (this.hasBroadCast) {
        return this.slide.broadcast.title
      }

      return null
    },

    subTitle() {
      if (this.isPlaceholder) {
        return null
      }
      return this.slide?.sub_title
    },

    link() {
      if (this.slide?.link) {
        return this.slide.link
      }

      if (this.hasBroadCast) {
        return `/broadcast/${this.slide.broadcast.id}`
      }

      return null
    },

    linkText() {
      if (this.isPlaceholder) {
        return null
      }
      if (this.slide?.link_text) {
        return this.slide.link_text
      }

      if (this.hasBroadCast) {
        return this.$t('watchBroadcast')
      }

      return this.$t('details')
    },
  },
}
</script>

<style lang="scss">
.the-banner-item {
  &--wrapper {
    padding-bottom: 60%;

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

    .slider-stub {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      &:after {
        //background-color: $blue-darker;
      }
    }
  }

  &__bg-image {
    transition: opacity 0.5s ease 0.2s;
  }

  //&-info {
  //  position: absolute;
  //  left: 25px;
  //  bottom: 25px;
  //  color: #fff;
  //  z-index: 1;
  //}

  //&__title {
  //  margin-top: 0;
  //  margin-bottom: 10px;
  //  font-size: 46px;
  //  font-weight: 700;
  //}

  &__subtitle {
    margin-bottom: 15px;
    font-size: 14px;
  }
}

@media (min-width: 767px) {
  .the-banner-item {
    &--wrapper {
      padding-bottom: 0;
      height: 520px;
    }
  }
}
</style>
