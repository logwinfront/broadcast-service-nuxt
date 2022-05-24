<template>
  <div class="grid-layout lg:container px-4 lg:px-3 mx-auto mb-20">
    <!--    <div class="grid-layout-banner">-->
    <!--      <slot name="top-banner">-->
    <!--        <a href="#" target="_blank" class="grid-layout-banner__item">-->
    <!--          <img-->
    <!--            class="rounded"-->
    <!--            src="https://ol3.cdn.runad.co/uploads/media/0/7/69170/v1/Billboard.png"-->
    <!--            alt=""-->
    <!--          />-->
    <!--        </a>-->
    <!--      </slot>-->
    <!--    </div>-->
    <div class="grid-layout-content">
      <slot />
    </div>
    <div v-if="$slots['sidebar-banner']" class="grid-layout-sidebar">
      <slot name="sidebar-banner">
        <a href="#" target="_blank" class="grid-layout-sidebar__item">
          <img
            class="rounded"
            src="https://ol3.cdn.runad.co/uploads/media/4/9/68894/v1/300x600.jpg"
            alt=""
          />
        </a>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheGridLayoutWrapper',
}
</script>

<style scoped></style>
