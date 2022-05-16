<template>
  <div>
    <MainSlider class="mt-3" :slides="mainSlider" />

    <div class="lg:container mx-auto">
      <TheBroadCastSlider
        class="pt-7 pb-4"
        :items="actualBroadcasts"
        title="Актуальные трансляции"
      />

      <TheDateSlider />
    </div>

    <div></div>
  </div>
</template>

<script>
import ApiService from '~/src/services/ApiService'
import MainSlider from '~/src/components/sliders/main/MainSlider'
import TheBroadCastSlider from '~/src/components/sliders/broadcasts/TheBroadCastSlider'
import TheDateSlider from '~/src/components/sliders/dates/TheDateSlider'
export default {
  name: 'IndexPage',
  components: { TheDateSlider, TheBroadCastSlider, MainSlider },
  data() {
    return {
      mainSlider: [],
      actualBroadcasts: [],
    }
  },
  async fetch() {
    const getSlides = async (params) => {
      const response = await ApiService.slider.getItems(params).catch((e) => {})
      return response?.data?.results ?? []
    }

    this.mainSlider = await getSlides({
      active: true,
      slider__code: 'main',
      page_size: 50,
    })

    this.actualBroadcasts = await getSlides({
      active: true,
      slider__code: 'actual_broadcasts',
      page_size: 20,
    })
  },
}
</script>
