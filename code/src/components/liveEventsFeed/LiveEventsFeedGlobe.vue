<script setup>
  import { get } from 'lodash'
  import moment from 'moment'
  import { ref, onMounted, onUnmounted, defineProps } from 'vue'
  import { $emitter as pluginEmitter } from '@/plugins/pluginEmitter.js'
  import LiveEventsFeedMenu from '@/components/liveEventsFeed/LiveEventsFeedMenu.vue'

  const props = defineProps({
    msController: Object,
    iconSrc: String,
    ocolor: String,
    event: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: () => 0
    },
    background: {
      type: String,
      default: () => '#000000'
    },
    color: {
      type: String,
      default: () => '#ffffff'
    }
  })
  
  const isOpen = ref(false)
  const interval = ref(null)
  const eventName = 'openFeedGroup'
  const dateFromNow = ref(moment(props.event.updatedAt).fromNow())

  const getClass = index => {
    const frontClass = 'live-events-feed-item--front'
    if (isOpen.value) return frontClass
    if (index == 0) return frontClass
    return `live-events-feed-item--back-${index} live-events-feed-item--back-close`
  }

  onUnmounted(() => {
    isOpen.value = false
    pluginEmitter.off(eventName)
    clearInterval(interval.value)
  })

  onMounted(() => {
    interval.value = setInterval(() => { 
      dateFromNow.value = moment(props.event.updatedAt).fromNow()
    }, 10000)
    pluginEmitter.on(eventName, groupId => {
      const docId = get(props, 'event.docId')
      if (groupId != docId) return 
      isOpen.value = !isOpen.value
    })
  })
</script>

<template>
  <div 
    :style="{ background: props.background }" 
    :class="getClass(props.index)"
    class="live-events-feed-item">
    <section>
      <section class="live-events-feed-item--time">
        {{ $filters.fullName(props.event, 'data.user') }} - 
        {{ moment(props.event.updatedAt).format('MMM D [at] hh:mma') }} 
        ({{dateFromNow}})
      </section>
      <section class="live-events-feed-item--information">
        <img :src="iconSrc" alt="icon" class="live-events-feed-item--information-icon">
        <section class="live-events-feed-item--information-display">
          <span :style="{ color: props.color }">
            {{ get(props.event, 'data.display') }}
          </span>
          <span 
            :style="{ color: (props.ocolor || props.color) }"
            class="live-events-feed-item--information-display--observation">
            Client: BMW - Total: $2.500 USD - Heat: COLD - Interest: 0 Pnts - 0 Views
          </span>
        </section>
      </section>
      <section class="live-events-feed-item--information-observation">
        <span>{{ get(props.event, 'data.observation') || '---'}}</span>
      </section>
    </section>
    <section class="live-events-feed-item--menu">
      <LiveEventsFeedMenu>
        <template #actions>
          <el-dropdown-menu>
            <el-dropdown-item @click="$emitter.emit(eventName, get(event, 'docId'))">
              {{ isOpen ? 'Close' : 'Open' }}
            </el-dropdown-item>
            <el-dropdown-item divided disabled>
              Delete
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </LiveEventsFeedMenu>
    </section>
  </div>
</template>

<script>


export default {
  name: 'LiveEventsFeedOpened'
}
</script>

<style scoped lang="scss">
  @use "sass:math";
  
  $max_events_group: 100;

  %globe-back-styles {
    left: 50%;
    width: 100%;
    position: absolute;
    transform: translateX(-50%);
  }

  @mixin top-event-group {
    $base: 10;
    $units:'rem';
    $factor: 70;
    @for $i from 1 through $max_events_group {
      .live-events-feed-item--back-#{$i} { 
        @extend %globe-back-styles; 
        // width: #{100 - $i} + '%'; 
        z-index: #{$max_events_group - $i};
        top: #{ math.log($i * $factor * $i, $base) + $units};
      }
    }
  }

  @include top-event-group;

  .live-events-feed-item {
    display: grid;
    gap: 0px 0px; 
    grid-template-columns: 16fr 1fr; 
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    box-shadow: inset 0 0 5px 1px rgb(225 225 225 / 25%);
  }
  .live-events-feed-item--front {
    z-index: $max_events_group + 1;
    position: relative;
  }
  .live-events-feed-item--back-close {
    .live-events-feed-item--information-observation {
      display: none;
    }
  }
  .live-events-feed-item--time {
    font-size: 1rem;
    color: #808080;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  .live-events-feed-item--menu {
    text-align: center;
  }
  .live-events-feed-item--information-observation {
    font-size: 1rem;
    color: #808080;
    font-weight: 400;
    margin-top: 0.5rem;
  }  
  .live-events-feed-item--information {
    font-size: 1.5rem;
    font-weight: 500;
    display: grid;
    grid-template-columns: 1fr 48fr;
    gap: 1rem;
    align-items: center;
    &-icon {
      width: 2.6rem;
    }
    &-display {
      display: flex;
      flex-direction: column;
      line-height: 1.5;
      &--observation {
        font-size: 1.12rem;
      }
    }
  }
  .live-events-feed-group--show >>> .live-events-feed-item {
    position: relative !important;
  }
</style>
