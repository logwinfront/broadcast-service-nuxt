<template>
  <div class="text-white date-slider flex items-end">
    <button
      class="text-3xl date-slider--prev h-14 w-14 border-primary border-2 rounded flex items-center justify-center"
      :class="[page === 0 ? 'text-gray cursor-not-allowed' : 'text-white']"
    >
      <client-only>
        <Icon icon="ph:caret-left-light" />
      </client-only>
    </button>
    <client-only>
      <template #placeholder>
        <div class="mx-2.5 flex">
          <div
            v-for="i in 7"
            :key="`sk-${i}`"
            class="date-slider__item pt-3 w-20"
          >
            <div
              class="date-slider__item-wrap bg-primary h-14 rounded flex flex-col items-center justify-center"
            >
              <div
                class="animate-pulse date-slider__item-day h-4 w-5 bg-gray-700 rounded"
              ></div>
              <div
                class="animate-pulse date-slider__item-weekday h-2.5 mt-2.5 w-11 bg-gray-700 rounded"
              ></div>
            </div>
          </div>
        </div>
      </template>

      <swiper
        ref="swiper"
        :key="page"
        :options="swiperOptions"
        @slideNextTransitionEnd="nextSlide"
        @slidePrevTransitionEnd="prevSlide"
      >
        <swiper-slide
          v-for="(dates, idx) in datesForRender"
          :key="idx"
          class="flex"
        >
          <div
            v-for="date in dates"
            :key="date.timestamp"
            class="date-slider__item pt-3 w-20"
          >
            <div
              class="date-slider__item-wrap h-14 rounded flex flex-col items-center"
              :class="[
                date.timestamp === selectedDate
                  ? 'bg-primary-400'
                  : 'bg-primary',
                date.isWeekend ? 'text-secondary' : '',
              ]"
              @click="selectDate(date)"
            >
              <span v-if="date.date === 1" class="date-slider__item-month">{{
                date.month
              }}</span>
              <div class="date-slider__item-day">
                {{ date.date }}
              </div>
              <div class="date-slider__item-weekday" :class="{}">
                {{ date.weekDay }}
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </client-only>
    <button
      class="text-3xl text-white date-slider--next h-14 w-14 border-primary border-2 rounded flex items-center justify-center"
    >
      <client-only>
        <Icon icon="ph:caret-right-light" />
      </client-only>
    </button>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import { format, isToday, isWeekend } from 'date-fns'
import { ru, enGB } from 'date-fns/locale'
import { sliceIntoChunks } from '~/src/utils/pure-functions'

const locales = { ru, enGB }

export default {
  name: 'TheDateSlider',
  components: { Icon },
  config: {
    DAYS_PER_PAGE: 7,
  },
  props: {
    nowDate: {
      type: Number,
      default: new Date(new Date().setUTCHours(0, 0, 0, 0)).getTime(),
    },
  },
  data() {
    return {
      nowDateLocal: this.nowDate,
      selectedDate: this.nowDate,
      page: 0,
    }
  },
  computed: {
    swiperOptions() {
      return {
        navigation: {
          nextEl: '.date-slider--next',
          prevEl: '.date-slider--prev',
        },
        initialSlide: this.page === 0 ? 0 : 1,
        autoUpdate: false,
        centeredSlides: true,
        loop: false,
        simulateTouch: false,
        slidesPerView: 1,
        spaceBetween: 0,
      }
    },
    currentDate() {
      const dateTemp = new Date(this.nowDateLocal)

      const date = new Date(
        dateTemp.setDate(
          dateTemp.getDate() - this.$options.config.DAYS_PER_PAGE
        )
      )
      if (this.page === 0) {
        return new Date(this.nowDateLocal)
      }

      return new Date(
        date.setDate(
          date.getDate() + this.page * this.$options.config.DAYS_PER_PAGE
        )
      )
    },

    datesArray() {
      return this.getDates(this.currentDate)
    },

    datesForRender() {
      return sliceIntoChunks(this.datesArray.map(this.getDateData), 7)
    },
  },

  watch: {
    selectedDate(val) {
      this.$emit('changeSelectedDate', val)
    },
  },
  methods: {
    getDateData(date) {
      const localeOptions = {
        locale: locales[this.$i18n.localeProperties.dateFnsCode],
      }

      const weekDay = isToday(date)
        ? this.$t('today')
        : format(date, 'EEEEEE', localeOptions)

      return {
        date: date.getDate(),
        weekDay,
        isWeekend: isWeekend(date),
        timestamp: date.getTime(),
        month: format(date, 'MMMM', localeOptions),
      }
    },
    getDates(initDate) {
      const dates = [new Date(initDate)]

      for (let i = 1; i < this.$options.config.DAYS_PER_PAGE * 3; i++) {
        dates.push(new Date(initDate.setDate(initDate.getDate() + 1)))
      }

      return dates.sort((a, b) => a.timestamp - b.timestamp)
    },
    selectDate(date) {
      this.selectedDate = date.timestamp
    },

    nextSlide() {
      this.page++
    },

    prevSlide() {
      if (this.page > 1) {
        this.page--
      }
    },
  },
}
</script>

<style lang="scss">
.date-slider {
  .swiper-container {
    width: 620px !important;
    margin-left: 10px;
    margin-right: 10px;
  }

  &__arrows {
    padding-top: 12px;
    //.splide__arrow {
    //  background: none;
    //  font-size: 30px;
    //  height: 54px;
    //  width: 54px;
    //  border: 1px solid $indigo;
    //  border-radius: 6px;
    //  //transition: 0.3s;
    //  opacity: 1;
    //  &--prev {
    //    left: -64px;
    //  }
    //  &--next {
    //    right: -64px;
    //  }
    //}
  }

  &__instance {
    width: 550px;
  }

  &__calendar {
    margin-left: auto;
    font-size: 30px;
  }
  &__item {
    &:not(:last-of-type) {
      margin-right: 10px;
    }

    &-wrap {
      position: relative;
      padding: 6px 12px;
      cursor: pointer;
      user-select: none;
    }

    &-month {
      position: absolute;
      font-size: 12px;
      top: -16px;
      left: 0;
      right: 0;
      opacity: 0.8;
      text-align: center;
    }

    &-day {
      font-size: 16px;
      font-weight: 600;
    }

    &-weekday {
      font-size: 12px;
      text-transform: lowercase;
    }

    &--active {
      .date-slider__item-wrap {
        //background: $indigo-light;
      }
    }

    &--weekend {
      //color: $primary;
    }
  }
}
</style>
