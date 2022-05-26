<template>
  <footer class="lg:container px-4 lg:px-3 mx-auto py-4">
    <div
      class="py-12 border-t border-b border-gray-900 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-4 text-gray-400 footer-links"
    >
      <div>
        <ul>
          <li
            v-for="item in links.firstCol"
            :key="item.link"
            class="text-sm mb-1"
          >
            <nuxt-link
              :to="localePath(item.link)"
              active-class="text-white"
              class="hover:text-white"
              >{{ item.name }}</nuxt-link
            >
          </li>
        </ul>
      </div>
      <div class="pt-4 sm:pt-0 !row-span-2 lg:!row-span-1 lg:!col-span-2">
        <template v-if="topBroadcasts.length">
          <div class="font-bold text-sm mb-1 text-white">
            {{ $t('topBroadcasts') }}
          </div>
          <ul class="grid lg:grid-cols-2 gap-x-4">
            <li
              v-for="item in topBroadcasts"
              :key="item.link"
              class="text-sm mb-1"
            >
              <nuxt-link
                class="line-clamp-1 hover:text-white"
                active-class="text-white"
                :to="localePath(`/broadcast/${item.id}`)"
                >{{ item.title }}</nuxt-link
              >
            </li>
          </ul>
        </template>
      </div>
      <div>
        <ul>
          <li
            v-for="item in links.lastCol"
            :key="item.link"
            class="text-sm mb-1"
          >
            <nuxt-link
              :to="localePath(item.link)"
              active-class="text-white"
              class="hover:text-white"
              >{{ item.name }}</nuxt-link
            >
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import ApiService from '~/src/services/ApiService'

const TOP_BROADCASTS_PER_COLUMN = 6

export default {
  name: 'TheFooter',
  data() {
    return {
      links: {
        firstCol: [
          { name: 'Правила', link: '/rules' },
          { name: 'Правообладателям', link: '/legal' },
          { name: 'Пользовательское соглашение', link: '/terms-of-use' },
          { name: 'Политика конфиденциальности', link: '/private-policy' },
        ],
        lastCol: [
          { name: 'FAQ', link: '/faq' },
          { name: 'О нас', link: '/about-us' },
          { name: 'Контакты', link: '/contacts' },
        ],
      },
      topBroadcasts: [],
    }
  },
  async fetch() {
    const topBroadcastsResponse = await ApiService.broadcasts
      .top({ page_size: TOP_BROADCASTS_PER_COLUMN })
      .catch()

    if (topBroadcastsResponse) {
      this.topBroadcasts = topBroadcastsResponse.data
    }
  },
}
</script>

<style lang="scss">
.footer-links {
  grid-template-areas:
    'column-1'
    'column-3'
    'column-2';
  & > div {
    &:nth-child(1) {
      grid-area: column-1;
    }
    &:nth-child(2) {
      grid-area: column-2;
    }
    &:nth-child(3) {
      grid-area: column-3;
    }
  }
}

@media (min-width: 425px) {
  .footer-links {
    grid-template-areas: none;
    & > div {
      &:nth-child(1) {
        grid-area: auto;
      }
      &:nth-child(2) {
        grid-area: auto;
      }
      &:nth-child(3) {
        grid-area: auto;
      }
    }
  }
}
</style>
