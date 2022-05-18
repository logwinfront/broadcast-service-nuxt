<template>
  <div class="breadcrumbs-block p-4 rounded bg-primary flex">
    <div v-if="logo" class="breadcrumbs-block__logo mr-6">
      <img class="w-full" :src="logo" :alt="title" />
    </div>
    <div class="breadcrumbs-block__content">
      <div>
        <ul
          v-if="breadcrumbs.length"
          class="breadcrumbs-block__breadcrumbs mb-2 mt-0 text-white flex flex-wrap items-center"
          :class="{ 'mb-3': loading }"
        >
          <template v-if="loading">
            <li
              v-for="n in 3"
              :key="n"
              class="flex items-center leading-4 pb-0.5"
            >
              <div class="animate-pulse h-4 w-20 bg-gray-700 rounded"></div>
            </li>
          </template>
          <template v-else>
            <li
              v-for="(breadcrumb, idx) in breadcrumbs"
              :key="`breadcrumb-${idx}`"
              class="font-semibold leading-4 pb-0.5"
            >
              <nuxt-link
                v-if="breadcrumb.link"
                class="text-white leading-4"
                :to="localePath(breadcrumb.link)"
                >{{ breadcrumb.name }}</nuxt-link
              >
              <span v-else class="text-gray leading-4">{{
                breadcrumb.name
              }}</span>
            </li>
          </template>
        </ul>
        <template v-if="title || showTitle">
          <div
            v-if="loading"
            class="animate-pulse h-5 w-24 bg-gray-700 rounded"
          ></div>
          <h1
            v-else
            class="leading-none text-white mt-0 font-semibold text-2xl"
          >
            {{ title }}
          </h1>
        </template>
      </div>
      <ul v-if="links" class="breadcrumbs-block__links mt-2.5">
        <li v-for="(link, idx) in links" :key="`breadcrumbs-${idx}`">
          <router-link :to="link.link">{{ link.name }}</router-link>
        </li>
      </ul>
      <slot v-else name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheBreadcrumbs',
  props: {
    logo: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    breadcrumbs: {
      type: Array,
      required: true,
    },
    links: {
      type: Array,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showTitle: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.breadcrumbs-block {
  display: flex;
  //background: $blue-darker;

  &__logo {
    flex-basis: 76px;
    min-width: 76px;

    img {
      width: 100%;
    }
  }

  &__title {
    line-height: 1;
  }

  &__links {
    list-style: none;
    display: flex;
    a {
      text-transform: uppercase;
      text-decoration: none;
      //color: $gray-light;
      font-size: 12px;
      margin-right: 10px;
    }
  }

  &__breadcrumbs {
    list-style: none;
    li {
      &:not(:last-of-type) {
        &:after {
          font-size: 11px;
          line-height: 1;
          content: '/';
          //color: $gray-lighter;
          margin: 0 8px;
        }
      }
      a {
        text-decoration: none;
        font-weight: 400;
      }
      span {
        font-weight: 400;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
  }
}
</style>
