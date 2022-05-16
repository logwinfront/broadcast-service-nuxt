<template>
  <component
    :is="typeComponent"
    :to="to"
    :tag="to ? 'button' : null"
    :disabled="disabled"
    class="app-button rounded"
    :class="[
      solid ? 'app-button--solid' : 'app-button--outlined',
      ownSize ? '' : small ? 'text-sm lg:text-base' : 'lg:text-xl',
      loading && 'app-button--loading',
    ]"
    :href="link"
    @click="$emit('click')"
  >
    <div
      v-if="loading"
      class="w-5 h-5 lg:w-8 lg:h-8 border-b-2 border-gray-900 rounded-full animate-spin absolute"
    ></div>
    <span class="app-button__body">
      <slot />
    </span>
  </component>
</template>

<script>
export default {
  name: 'TheButton',
  props: {
    solid: {
      type: Boolean,
      default: true,
    },
    small: {
      type: Boolean,
      default: false,
    },
    ownSize: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // color: {
    //   type: String,
    //   default: 'primary'
    // },
    icon: {
      type: String,
      default: null,
    },
    to: {
      type: [String, Object],
      default: null,
    },
    link: {
      type: String,
      default: null,
    },
  },
  computed: {
    typeComponent() {
      return this.to ? 'nuxt-link' : this.link ? 'a' : 'button'
    },
  },
}
</script>

<style scoped lang="scss">
.app-button {
  display: flex;
  justify-content: center;
  align-items: center;
  @apply px-5 py-1.5 relative;

  &[disabled] {
    filter: brightness(0.9);
  }

  &--outlined {
    border-style: solid;
    border-width: 1px;
  }

  &::v-deep {
    svg {
      height: 100%;
    }
  }

  &:hover {
    transition: 0.3s;
  }

  &--loading {
    .app-button__body {
      opacity: 0;
      visibility: hidden;
    }
  }
}

//@media (min-width: 768px) {
//  .app-button {
//    font-size: 20px;
//  }
//}
</style>
