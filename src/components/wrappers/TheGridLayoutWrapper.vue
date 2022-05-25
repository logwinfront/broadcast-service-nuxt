<template>
  <div class="grid-layout lg:container px-4 lg:px-3 mx-auto mb-20">
    <div class="grid-layout-banner">
      <slot name="top-banner">
        <a href="#" target="_blank" class="grid-layout-banner__item">
          <img
            class="rounded"
            src="https://ol3.cdn.runad.co/uploads/media/0/7/69170/v1/Billboard.png"
            alt=""
          />
        </a>
      </slot>
    </div>
    <div class="grid-layout-content">
      <slot />
    </div>
    <div class="grid-layout-sidebar">
      <a href="#" target="_blank" class="grid-layout-sidebar__item mb-2">
        <img
          class="rounded"
          src="https://ol3.cdn.runad.co/uploads/media/4/9/68894/v1/300x600.jpg"
          alt=""
        />
      </a>
      <slot name="sidebar-banner"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheGridLayoutWrapper',
}
</script>

<style lang="scss">
.grid-layout {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  grid-template-areas:
    'banner'
    'content';

  &-banner {
    grid-area: banner;
    transition: 0.3s;

    &__item {
      display: block;
      img {
        width: 100%;
      }
    }
  }

  &-content {
    grid-area: content;
  }

  &-sidebar {
    display: none;
  }
}

@media (min-width: 991px) {
  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 300px;
    grid-template-areas:
      'banner  banner'
      'content sidebar';

    &-sidebar {
      display: block;
      grid-area: sidebar;

      &__item {
        display: block;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
