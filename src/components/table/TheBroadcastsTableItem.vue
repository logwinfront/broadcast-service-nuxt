<template>
  <div class="text-white flex items-center py-1.5">
    <div class="w-40 flex flex-col pl-2">
      <p class="text-base">{{ startBroadcastTime }}</p>
      <p class="lowercase text-gray text-sm">{{ startBroadcastDate }}</p>
    </div>
    <div class="flex flex-col items-center flex-1">
      <div class="flex justify-center items-center mb-1 w-full">
        <div
          class="broadcast-table-item__team broadcast-table-item__team--left"
        >
          <div class="truncate font-light" :title="teamsData.team1.name">
            {{ teamsData.team1.name }}
          </div>
          <img v-if="teamsData.team1.logo" :src="teamsData.team1.logo" alt="" />
        </div>

        <div class="px-5 text-gray">-vs-</div>

        <div
          class="broadcast-table-item__team broadcast-table-item__team--right"
        >
          <img v-if="teamsData.team2.logo" :src="teamsData.team2.logo" alt="" />
          <div class="truncate font-light" :title="teamsData.team2.name">
            {{ teamsData.team2.name }}
          </div>
        </div>
      </div>
      <nuxt-link
        v-if="showTournament && tournamentName"
        :to="tournamentLink"
        class="text-gray text-center text-xs"
        >{{ tournamentName }}</nuxt-link
      >
    </div>
    <div class="w-40 flex justify-end pr-2">
      <TheButton
        :to="broadcastLink"
        class="bg-secondary hover:bg-secondary-400"
        small
        >{{ $t('watch') }}</TheButton
      >
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { ru, enGB } from 'date-fns/locale'
import TheButton from '~/src/components/ui/TheButton'
const locales = { ru, enGB }

export default {
  name: 'TheBroadcastsTableItem',
  components: { TheButton },
  props: {
    broadcast: {
      type: Object,
      required: true,
    },
    showTournament: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    broadcastLink() {
      return `/broadcast/${this.broadcast.id}`
    },
    teamsData() {
      return {
        team1: {
          name: this.broadcast?.team1?.name ?? '',
          icon: this.broadcast?.team1?.logo ?? null,
        },
        team2: {
          name: this.broadcast?.team2?.name ?? '',
          icon: this.broadcast?.team2?.logo ?? null,
        },
      }
    },
    localeOptions() {
      return { locale: locales[this.$i18n.localeProperties.dateFnsCode] }
    },
    dateStartObject() {
      return new Date(this.broadcast.datetime_start)
    },
    startBroadcastTime() {
      return format(this.dateStartObject, 'HH:mm', this.localeOptions)
    },
    startBroadcastDate() {
      return format(this.dateStartObject, 'EEEEEE dd.MM', this.localeOptions)
    },
    tournamentLink() {
      return `/${this.broadcast.sport?.slug}/${this.broadcast.tournament?.slug}`
    },
    tournamentName() {
      return this.broadcast?.tournament?.name
    },
  },
}
</script>

<style lang="scss">
.broadcast-table-item {
  &__team {
    //padding: 5px 0;
    display: flex;
    align-items: center;
    font-size: 16px;
    flex-grow: 1;
    flex-basis: 0;
    min-width: 0;
    $image-offset: 15px;

    &--left {
      justify-content: flex-end;
      img {
        margin-left: $image-offset;
      }
    }

    &--right {
      img {
        margin-right: $image-offset;
      }
    }

    img {
      height: 45px;
      width: 45px;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
