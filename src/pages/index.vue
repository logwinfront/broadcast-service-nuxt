<template>
  <div>
    <MainSlider class="mt-3" :slides="mainSlider" />

    <div class="lg:container mx-auto pt-7">
      <TheBroadCastSlider
        :items="actualBroadcasts"
        title="Актуальные трансляции"
      />
    </div>
  </div>
</template>

<script>
import ApiService from '~/src/services/ApiService'
import MainSlider from '~/src/components/sliders/main/MainSlider'
import TheBroadCastSlider from '~/src/components/sliders/broadcasts/TheBroadCastSlider'
export default {
  name: 'IndexPage',
  components: { TheBroadCastSlider, MainSlider },
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
