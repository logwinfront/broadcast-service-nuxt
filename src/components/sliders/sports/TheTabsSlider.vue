<template>
  <client-only>
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
        spaceBetween: 10,
        slidesPerView: 'auto',
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
