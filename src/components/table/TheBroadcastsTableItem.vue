<template>
  <div class="text-white flex lg:items-center py-1.5">
    <div class="lg:w-40 flex flex-col pl-2">
      <p class="text-sm font-semibold lg:font-normal lg:text-base">
        {{ startBroadcastTime }}
      </p>
      <p class="lowercase text-gray text-sm">{{ startBroadcastDate }}</p>
    </div>
    <div class="flex flex-col lg:items-center flex-1">
      <div class="lg:hidden text-white pl-4 text-sm">
        {{ teamsData.team1.name }} - {{ teamsData.team2.name }}
      </div>

      <div class="hidden lg:flex justify-center items-center mb-1 w-full">
        <template v-if="hasTeams">
          <div
            class="broadcast-table-item__team broadcast-table-item__team--left"
          >
            <div class="truncate font-light" :title="teamsData.team1.name">
              {{ teamsData.team1.name }}
            </div>
            <img :src="teamsData.team1.icon" alt="" />
          </div>

          <div class="px-5 text-gray">-vs-</div>

          <div
            class="broadcast-table-item__team broadcast-table-item__team--right"
          >
            <img :src="teamsData.team2.icon" alt="" />
            <div class="truncate font-light" :title="teamsData.team2.name">
              {{ teamsData.team2.name }}
            </div>
          </div>
        </template>
        <div v-else>{{ broadcast.title }}</div>
      </div>
      <nuxt-link
        v-if="showTournament && tournamentName"
        :to="localePath(tournamentLink)"
        class="hidden lg:block text-gray text-center text-xs"
        >{{ tournamentName }}</nuxt-link
      >
    </div>
    <div class="hidden lg:flex w-40 justify-end pr-2">
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
    hasTeams() {
      return this.broadcast?.team1 && this.broadcast?.team2
    },
    broadcastLink() {
      return `/broadcast/${this.broadcast.id}`
    },
    teamsData() {
      return {
        team1: {
          name: this.broadcast?.team1?.name ?? '',
          icon: this.broadcast?.team1?.logo ?? '/images/no-team.svg',
        },
        team2: {
          name: this.broadcast?.team2?.name ?? '',
          icon: this.broadcast?.team2?.logo ?? '/images/no-team.svg',
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
