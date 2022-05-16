<template>
  <div class="text-white date-slider">
    <pre>{{ currentDate }}</pre>

    <swiper>
      <swiper-slide v-for="(dates, idx) in datesForRender" :key="idx">
        {{ dates }}
      </swiper-slide>
    </swiper>

    <!--    <Splide :options="splideOptions"-->
    <!--            :key="state.page"-->
    <!--            :has-track="false"-->
    <!--            aria-label="Выбор дат"-->
    <!--            class="date-slider__instance"-->
    <!--            @splide:moved="movedSlider"-->
    <!--    >-->
    <!--      <SplideTrack>-->
    <!--        <SplideSlide-->
    <!--          v-for="(dates, idx) in datesForRender"-->
    <!--          :key="idx"-->
    <!--          class="flex items-center no-wrap"-->
    <!--        >-->
    <!--          <div v-for="date in dates" :key="date.timestamp"-->
    <!--               class="date-slider__item"-->
    <!--               :class="{ 'date-slider__item&#45;&#45;active' : date.timestamp === state.selectedDate, 'date-slider__item&#45;&#45;weekend' : date.isWeekend }">-->
    <!--            <div class="date-slider__item-wrap flex column items-center" @click="selectDate(date)">-->
    <!--              <span class="date-slider__item-month" v-if="date.date === 1">{{ date.month }}</span>-->
    <!--              <div class="date-slider__item-day">{{ date.date }}</div>-->
    <!--              <div class="date-slider__item-weekday">{{ date.weekDay }}</div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </SplideSlide>-->
    <!--      </SplideTrack>-->

    <!--      <div class="splide__arrows date-slider__arrows">-->
    <!--        <button class="splide__arrow splide__arrow&#45;&#45;prev">-->
    <!--          <Icon class="text-white" icon="ph:caret-right-light" />-->
    <!--        </button>-->
    <!--        <button class="splide__arrow splide__arrow&#45;&#45;next">-->
    <!--          <Icon class="text-white" icon="ph:caret-right-light" />-->
    <!--        </button>-->
    <!--      </div>-->

    <!--    </Splide>-->

    <!--    <Icon icon="ph:calendar-light" class="date-slider__calendar" />-->
  </div>
</template>

<script>
import { sliceIntoChunks } from '~/src/utils/pure-functions'

export default {
  name: 'TheDateSlider',
  config: {
    DAYS_PER_PAGE: 7,
    WEEK_DAYS: {
      1: 'Пн',
      2: 'Вт',
      3: 'Ср',
      4: 'Чт',
      5: 'Пт',
      6: 'Сб',
      0: 'Вс',
    },
    MONTH: {
      1: 'Январь',
      2: 'Февраль',
      3: 'Март',
      4: 'Апрель',
      5: 'Май',
      6: 'Июнь',
      7: 'Июль',
      8: 'Август',
      9: 'Сентябрь',
      10: 'Октябрь',
      11: 'Ноябрь',
      12: 'Декабрь',
    },
  },
  props: {
    nowDate: {
      type: Number,
      default: new Date(new Date().setUTCHours(0, 0, 0, 0)).getTime(),
    },
  },
  data() {
    return {
      selectedDate: this.nowDate,
      page: 0,
    }
  },
  computed: {
    currentDate() {
      const dateTemp = new Date(this.nowDate)

      const date = new Date(
        dateTemp.setDate(dateTemp.getDate() - this.$options.DAYS_PER_PAGE)
      )
      if (this.page === 0) {
        return new Date(this.nowDate)
      }

      return new Date(
        date.setDate(date.getDate() + this.page * this.$options.DAYS_PER_PAGE)
      )
    },

    datesArray() {
      return this.getDates(this.currentDate)
    },

    datesForRender() {
      return sliceIntoChunks(this.datesArray.map(this.getDateData), 7)
    },

    slideOptions() {
      return {
        type: 'slide',
        arrows: true,
        pagination: false,
        start: this.page === 0 ? 0 : 1,
        // autoWidth: true,
        drag: false,
        gap: 10,
        perPage: 1,
      }
    },
  },
  methods: {
    getDateData(date) {
      const weekDay =
        this.nowDate === date.getTime()
          ? 'Сегодня'
          : this.$options.config.WEEK_DAYS[date.getDay()]

      const isWeekend = date.getDay() === 6 || date.getDay() === 0

      return {
        date: date.getDate(),
        weekDay,
        isWeekend,
        timestamp: date.getTime(),
        month: this.$options.config.MONTH[date.getMonth() + 1],
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

    movedSlider(_, newIndex, prevIndex) {
      if (newIndex < prevIndex) {
        this.page--
      } else {
        this.page++
      }
    },
  },
}
</script>

<!--<script setup>-->
<!--import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide'-->
<!--import { Icon } from '@iconify/vue'-->
<!--import { computed, reactive, watch } from 'vue'-->
<!--import { sliceIntoChunks, timestampToApiFormat } from 'src/services/functions'-->

<!--const emit = defineEmits({-->
<!--  changeSelectedDate: (selectedDate) => {-->
<!--    return selectedDate-->
<!--  },-->
<!--})-->

<!--watch(-->
<!--  () => state.selectedDate,-->
<!--  (val) => {-->
<!--    emit('changeSelectedDate', val)-->
<!--  }-->
<!--)-->
<!--</script>-->

<style lang="scss">
.date-slider {
  //display: flex;
  //align-items: center;
  margin-left: 64px;

  &__arrows {
    padding-top: 12px;
    .splide__arrow {
      background: none;
      font-size: 30px;
      height: 54px;
      width: 54px;
      //border: 1px solid $indigo;
      border-radius: 6px;
      //transition: 0.3s;
      opacity: 1;
      &--prev {
        left: -64px;
      }
      &--next {
        right: -64px;
      }
    }
  }

  &__instance {
    width: 550px;
  }

  &__calendar {
    margin-left: auto;
    font-size: 30px;
  }
  &__item {
    padding-top: 12px;
    width: 70px;

    &:not(:last-of-type) {
      margin-right: 10px;
    }

    &-wrap {
      position: relative;
      display: flex;
      align-items: center;
      padding: 6px 12px;
      //border-radius: $border-radius;
      //background: $indigo;
      height: 100%;
      cursor: pointer;
      user-select: none;
    }

    &-month {
      position: absolute;
      font-size: 12px;
      font-weight: 600;
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
