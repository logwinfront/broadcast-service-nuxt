<template>
  <component
    :is="component"
    :to="linkToBroadCast"
    class="the-broadcast-item-card h-40 rounded-md"
  >
    <div class="the-broadcast-item-card__bg bg-primary" :style="styles"></div>

    <template v-if="isPlaceholder || !item">
      <div
        class="the-broadcast-item__date w-24 rounded bg-primary-400 h-5 flex items-center"
      ></div>

      <div class="the-broadcast-item__logos">
        <div class="h-16 w-12 bg-primary-400 mr-6 rounded"></div>

        <Icon icon="ph:x" />

        <div class="h-16 w-12 bg-primary-400 ml-6 rounded"></div>
      </div>

      <div
        class="the-broadcast-item__title truncate px-5 flex items-center justify-center"
      >
        <div class="h-3 w-52 bg-primary-400 rounded-sm"></div>
      </div>
    </template>
    <template v-else>
      <div class="the-broadcast-item__date rounded bg-gray-700 h-5">
        {{ startBroadcastDate }}
      </div>

      <div class="the-broadcast-item__logos">
        <TheImg class="h-16" :src="teams.team1.logo" :alt="teams.team1.name" />

        <Icon icon="ph:x" />

        <TheImg class="h-16" :src="teams.team2.logo" :alt="teams.team2.name" />
      </div>

      <div class="the-broadcast-item__title line-clamp-2 text-center px-5">
        {{ broadcastTitle }}
      </div>
    </template>
  </component>
</template>

<script>
import { format, isToday, isTomorrow } from 'date-fns'
import { Icon } from '@iconify/vue2'
import { ru, enGB } from 'date-fns/locale'
import TheImg from '~/src/components/ui/TheImg'
const locales = { ru, enGB }

export default {
  name: 'TheBroadCastSliderItem',
  components: { TheImg, Icon },
  props: {
    item: {
      type: Object,
      default: null,
    },
    isPlaceholder: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasTeams() {
      return this.item?.broadcast?.team1 && this.item?.broadcast?.team2
    },
    broadcastTitle() {
      if (this.hasTeams) {
        return `${this.teams.team1.name} - ${this.teams.team2.name}`
      }
      return this.item?.broadcast?.title ?? ''
    },
    teams() {
      return {
        team1: {
          name: this.item?.broadcast?.team1.name ?? '',
          logo: this.item?.broadcast?.team1.logo ?? '/images/no-team.svg',
        },
        team2: {
          name: this.item?.broadcast?.team2.name ?? '',
          logo: this.item?.broadcast?.team2.logo ?? '/images/no-team.svg',
        },
      }
    },
    component() {
      if (this.isPlaceholder) {
        return 'div'
      }
      return 'nuxt-link'
    },
    localeOptions() {
      return {
        locale: locales[this.$i18n.localeProperties.dateFnsCode],
      }
    },
    startBroadcastDate() {
      if (!this.item) {
        return
      }

      const dateStart = new Date(this.item.broadcast.datetime_start)

      if (isToday(dateStart)) {
        return format(dateStart, 'HH:mm')
      }
      if (isTomorrow(dateStart)) {
        return format(dateStart, 'HH:mm')
      }

      return format(dateStart, 'dd.MM.yyyy HH:mm')
    },

    styles() {
      if (this.isPlaceholder) {
        return {}
      }
      const image = `/images/sports/${this.item.broadcast.sport.slug}.png.png`
      return { backgroundImage: `url('${image}')` }
    },

    linkToBroadCast() {
      if (this.isPlaceholder) {
        return null
      }
      return `/broadcast/${this.item.broadcast.id}`
    },
  },
}
</script>

<style lang="scss">
.the-broadcast-item {
  &-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    //height: 150px;
    position: relative;
    overflow: hidden;

    &__bg {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      transition: 0.3s;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        transition: 0.3s;
      }
    }
  }

  &__logos {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    & > img {
      transition: 0.3s;
      width: calc((100% - 50px) / 2);
      object-fit: contain;
    }

    & > svg {
      font-size: 30px;
      opacity: 0.7;
    }
  }

  &__title {
    color: #fff;
    position: absolute;
    bottom: 10px;
    font-size: 12px;
    margin: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 1;
  }

  &__teams {
    padding: 5px 0;
    font-size: 12px;
  }

  &__date {
    font-size: 10px;
    padding: 2px 10px;
    color: #fff;
    position: absolute;
    left: 4px;
    top: 4px;
    z-index: 1;
  }

  &:hover {
    cursor: pointer;
    .the-broadcast-item {
      &-card__bg {
        transform: scale(1.2);

        &:before {
          background: rgba(0, 0, 0, 0.7);
        }
      }
    }
  }
}
</style>
