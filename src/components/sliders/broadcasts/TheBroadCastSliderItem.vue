<template>
  <nuxt-link :to="linkToBroadCast" class="the-broadcast-item-card rounded-lg">
    <div class="the-broadcast-item-card__bg" :style="styles"></div>

    <div class="the-broadcast-item__date rounded bg-gray-700">
      {{ startBroadcastDate }}
    </div>

    <div class="the-broadcast-item__logos">
      <TheImg
        :src="item.broadcast.team1.logo"
        :alt="item.broadcast.team1.name"
      />

      <Icon icon="ph:x" />

      <TheImg
        :src="item.broadcast.team2.logo"
        :alt="item.broadcast.team2.name"
      />
    </div>

    <div class="the-broadcast-item__title truncate px-5">
      {{ item.broadcast.title }}
    </div>
  </nuxt-link>
</template>

<script>
import { format, isToday, isTomorrow } from 'date-fns'
import { Icon } from '@iconify/vue2'
import TheImg from '~/src/components/ui/TheImg'

export default {
  name: 'TheBroadCastSliderItem',
  components: { TheImg, Icon },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    startBroadcastDate() {
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
      const image = this.item.broadcast.image
        ? this.item.broadcast.image
        : require('../../../assets/images/default_actual_broadcast.jpg')
      return { backgroundImage: `url('${image}')` }
    },

    linkToBroadCast() {
      return `/broadcast/${this.item.broadcast.id}`
    },
  },
}
</script>

<style lang="scss">
.the-broadcast-item {
  min-width: 240px;

  &-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 150px;
    position: relative;
    padding: 0 10px;
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
        background: rgba(0, 0, 0, 0.8);
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
      height: 50px;
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
