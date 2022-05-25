<template>
  <div>
    <TheHeaderWrapper />
    <div class="grid-layout lg:container px-4 lg:px-3 pt-4 mx-auto mb-20">
      <div class="grid-layout-banner">
        <a href="#" target="_blank" class="grid-layout-banner__item">
          <img
            class="rounded"
            src="https://ol3.cdn.runad.co/uploads/media/0/7/69170/v1/Billboard.png"
            alt=""
          />
        </a>
      </div>
      <div class="grid-layout-content">
        <router-view />
      </div>
      <div class="grid-layout-sidebar">
        <a href="#" target="_blank" class="grid-layout-sidebar__item">
          <img
            class="rounded"
            src="https://ol3.cdn.runad.co/uploads/media/4/9/68894/v1/300x600.jpg"
            alt=""
          />
        </a>
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheFooter from '~/src/components/footer/TheFooter'
import TheHeaderWrapper from '~/src/components/header/TheHeaderWrapper'
export default {
  name: 'GridBroadcasts',
  components: { TheHeaderWrapper, TheFooter },
  layout: 'grid',
}
</script>

<style lang="scss"></style>
