<template>
  <div>
    <client-only>
      <template #placeholder>
        <div class="flex gap-2.5 overflow-hidden">
          <TheTabsSliderItem
            v-for="(tab, idx) in tabs"
            :key="`tab1-${idx}`"
            class="flex-shrink-0"
            :is-active="tab.slug === activeTab"
            is-placeholder
            :tab="tab"
          />
        </div>
      </template>
      <swiper :options="swiperOptions">
        <TheTabsSliderItem
          v-for="(tab, idx) in tabs"
          :key="`tab-${idx}`"
          :tab="tab"
          :is-active="tab.slug === activeTab"
          @click="changeTab"
        />
      </swiper>
    </client-only>
  </div>
</template>

<script>
import TheTabsSliderItem from '~/src/components/sliders/sports/TheTabsSliderItem'
export default {
  name: 'TheTabsSlider',
  components: { TheTabsSliderItem },
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    activeTab: {
      type: String,
      required: true,
    },
  },
  computed: {
    swiperOptions() {
      return {
        spaceBetween: 6,
        slidesPerView: 'auto',
        breakpoints: {
          768: {
            spaceBetween: 10,
          },
        },
      }
    },
  },
  methods: {
    changeTab(tab) {
      this.$emit('change-tab', tab)
    },
  },
}
</script>

<style lang="scss"></style>
