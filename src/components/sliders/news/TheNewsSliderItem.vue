<template>
  <div class="news-slider-item">
    <div
      class="news-slider-item--wrapper py-4 px-4 lg:px-5 bg-primary rounded-lg rounded-br-none hover:bg-opacity-80"
    >
      <template v-if="item">
        <nuxt-link class="news-slider-item__text" :to="localePath(newsLink)">
          <div
            class="news-slider-item__title text-white ellipsis-3-lines font-bold line-clamp-2"
            :title="item.name"
          >
            {{ item.name }}
          </div>
          <div class="news-slider-item__desc text-gray line-clamp-3">
            {{ item.short_description }}
          </div>
        </nuxt-link>
        <div
          class="news-slider-item__image bg-primary-400 rounded overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-cover bg-center"
            :style="imageStyle"
          ></div>
        </div>
      </template>
      <template v-else>
        <div class="news-slider-item__text">
          <div
            class="news-slider-item__title text-white ellipsis-3-lines font-bold"
          >
            <div class="w-52 h-6 bg-primary-400 rounded"></div>
          </div>
          <div class="news-slider-item__desc text-gray ellipsis-3-lines">
            <div class="w-44 h-4 bg-primary-400 rounded"></div>
          </div>
        </div>
        <div
          class="news-slider-item__image bg-primary-400 rounded overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-cover bg-center"
            :style="imageStyle"
          ></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheNewsSliderItem',
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  computed: {
    imageStyle() {
      if (this.item?.preview_image) {
        return {
          backgroundImage: `url('${this.item.preview_image}')`,
        }
      }
      return null
    },

    newsLink() {
      return `/news/${this.item.slug}`
    },
  },
}
</script>

<style lang="scss">
.news-slider-item {
  padding-top: 20px;
  &--wrapper {
    height: 153px;
    display: flex;
    justify-content: space-between;

    &:hover {
      cursor: pointer;
      transition: background-image 80ms;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
  }

  &__desc {
    position: relative;
    top: 4px;
    padding-top: 4px;
    margin-bottom: 4px;
    transition: color 400ms;
    font-size: 13px;
    line-height: 16px;
    font-weight: 600;
    width: 100%;
    margin-top: auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__image {
    position: relative;
    flex-shrink: 0;
    margin-left: 16px;
  }
}

.news-slider-item__image {
  width: 100px;
  top: -30px;
  height: calc(100% + 30px);
}

//@media screen and (min-width: 600px) {
//  .news-slider-item__image {
//    width: 100px;
//    top: -30px;
//    height: calc(100% + 30px);
//  }
//}

@media screen and (min-width: 600px) and (max-width: 879px) {
  .news-slider-item__title {
    font-size: 15px;
    line-height: 20px;
    font-style: normal;
  }
}

@media screen and (min-width: 600px) {
  .news-slider-item__title {
    font-size: 18px;
    line-height: 24px;
    font-weight: 900;
    font-style: normal;
  }
}
</style>
