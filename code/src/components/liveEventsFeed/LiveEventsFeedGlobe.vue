<script setup>
  import { get } from 'lodash'
  import moment from 'moment'
  import LiveEventsFeedMenu from '@/components/liveEventsFeed/LiveEventsFeedMenu.vue'
</script>

<template>
  <div class="live-events-feed-item" :style="{ background }">
    <section>
      <section class="live-events-feed-item--time">
        {{ $filters.fullName(event, 'data.user') }} - 
        {{ moment(event.updatedAt).format('MMM D [at] hh:mma') }} 
        ({{dateFromNow}})
      </section>
      <section class="live-events-feed-item--information">
        <img :src="icon" alt="icon" class="live-events-feed-item--information-icon">
        <section class="live-events-feed-item--information-display">
          <span :style="{ color }">
            {{ get(event, 'data.display') }}
          </span>
          <span 
            :style="{ color: (ocolor || color) }"
            class="live-events-feed-item--information-display--observation">
            Client: BMW - Total: $2.500 USD - Heat: COLD - Interest: 0 Pnts - 0 Views
          </span>
        </section>
      </section>
      <section>
        <span>{{ get(event, 'data.observation') }}</span>
      </section>
    </section>
    <section>
      <LiveEventsFeedMenu />
    </section>
  </div>
</template>

<script>
export default {
  name: 'LiveEventsFeedOpened',
  props: {
    ocolor: String,
    icon: {
      type: String,
      required: true
    },
    event: {
      type: Object,
      required: true
    }, 
    background: {
      type: String,
      default() {
        return '#000000'
      }
    },
    color: {
      type: String,
      default() {
        return '#ffffff'
      }
    },
  },
  computed: {
    dateFromNow() {
      return moment(this.event.updatedAt).fromNow()
    }
  }
}
</script>

<style scoped lang="scss">
  .live-events-feed-item {
    display: grid;
    gap: 0px 0px; 
    grid-template-columns: 16fr 1fr; 
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
  }
  .live-events-feed-item--time {
    font-size: 1.25rem;
    color: #808080;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  .live-events-feed-item--information {
    font-size: 1.87rem;
    font-weight: 500;
    display: grid;
    grid-template-columns: 1fr 48fr;
    gap: 1rem;
    align-items: center;
    &-icon {
      width: 2.6rem;
    }
    &-display {
      display: grid;
      line-height: 1.5;
      &--observation {
        font-size: 1.37rem;
      }
    }
  }
</style>
