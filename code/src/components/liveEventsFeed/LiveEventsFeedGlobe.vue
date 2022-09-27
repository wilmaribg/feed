<template>
  <div 
    class="raf-bubble" 
    :id="id"
    :class="containerStatus(index)">    
    <div 
      :style="{ background: background }" 
      :class="getClass(index)"
      class="raf-item">
      <div>
        <div 
          :style="{ color: tColor }" 
          class="live-events-feed-item--time">
          {{ $filters.fullName(event, 'data.user') }} - 
          {{ moment(event.updatedAt).format('MMM D [at] hh:mma') }} 
          ({{ moment(event.updatedAt).fromNow() }})
        </div>
        <div class="live-events-feed-item--information">
          <div class="live-events-feed-item--information-images">
            <img 
              :src="iconSrc" 
              alt="icon" 
              class="live-events-feed-item--information-icon">
            <LottiesConfettiDocs 
              v-if="!isEmpty(lottieAnimationData)"
              style="--lottie-confetti-docs--width: 200px;"
              :animationData="lottieAnimationData"/>
          </div>
          <div class="live-events-feed-item--information-display">
            <span 
              :style="{ color: color }" 
              class="live-events-feed-item--information-display-text">
              {{ get(event, 'data.display') }}
            </span>
            <span 
              :style="{ color: oColor }"
              class="live-events-feed-item--information-display--observation">
              {{ get(event, 'data.resume') || '---' }}
            </span>
          </div>
        </div>
        <div class="live-events-feed-item--information-observation">
          <span>{{ get(event, 'data.observation') || '---' }}</span>
        </div>
      </div>
      <div class="live-events-feed-item--menu">
        <!-- <span>
          <el-tag class="mx-1" effect="plain" type="info">
            <span>
              3 More
              <el-icon color="red"><ArrowDownBold /></el-icon>
            </span>
          </el-tag>
        </span> -->  
        <LiveEventsFeedMenu>
          <template #actions>
            <el-dropdown-menu>
              
              <el-dropdown-item v-if="!isOpen" @click="toggleCollapse(!isOpen)">
                {{ 'Open' }}
              </el-dropdown-item>
              <el-dropdown-item v-else @click="toggleCollapse(!isOpen)">
                {{ 'Close' }}
              </el-dropdown-item>

              <el-dropdown-item divided disabled>
                Delete
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </LiveEventsFeedMenu>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { 
    ref, 
    onMounted, 
    onUnmounted, 
    defineProps, 
    defineEmits, 
    inject 
  } from 'vue'
  import { get, isEmpty } from 'lodash'
  import { v4 as uuidv4 } from 'uuid'

  import { useAppStore } from '@/store/app'
  import { $emitter as pluginEmitter } from '@/plugins/pluginEmitter.js'
  import LottiesConfettiDocs from '@/components/lotties/LottiesConfettiDocs.vue'
  import LiveEventsFeedMenu from '@/components/liveEventsFeed/LiveEventsFeedMenu.vue'

  const moment = inject('moment')
  const appStore = useAppStore()

  const emit = defineEmits(['onCollapse'])

  const props = defineProps({
    tone: String,
    lottieAnimationData: Object,
    msController: Object,
    iconSrc: String,
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
    },
    oColor: {
      type: String,
      default: () => '#ffffff'
    },
    tColor: {
      type: String,
      default: () => '#ffffff'
    }
  })

  const id = uuidv4()
  const isOpen = ref(false)
  const interval = ref(null)
  const eventName = 'openFeedGroup'
  const dateFromNow = ref(moment(props.event.updatedAt).fromNow())

  interval.value = setInterval(() => { 
    dateFromNow.value = moment(props.event.updatedAt).fromNow()
  }, 1000)

  const toggleCollapse = (visibility) => {
    console.log('roge toggleCollapse ----->', visibility)
    pluginEmitter.emit(eventName, {
      visibility,
      groupId: get(props.event, 'docId')
    })
  }

  const getClass = index => {
    const frontClass = 'live-events-feed-item--front'
    if (index == 0) return frontClass
    return `raf-itemBack-${index}`
    // if (isOpen.value) return `live-events-feed-item--back-${index}--open`
    // return `live-events-feed-item--back-${index} live-events-feed-item--back-close`
  }

  const containerStatus = index => {
    if (index == 0) return null
    let _default = `raf-bubbleBack`
    if (isOpen.value) _default += ` raf-bubbleBack--open`
    return _default
  }

  onUnmounted(() => {
    isOpen.value = false
    pluginEmitter.off(eventName)
    clearInterval(interval.value)
  })
  
  onMounted(() => {
    if (props.tone && props.event.source == 'socket' && !appStore.mute) {
      new Audio(props.tone).play()
    }
    pluginEmitter.on(eventName, ({ visibility, groupId }) => {
      console.log('roge pluginEmitter on ----->', visibility, groupId)
      const docId = get(props, 'event.docId')
      if (groupId != docId) return 
      isOpen.value = visibility
      setTimeout(() => emit('onCollapse', visibility), props.index * 10)
    })
  })
</script>

<style>
  :root {
    --live-events-feed-item--display-color: #ffffff;
  }
</style>

<style scoped lang="scss">
  @use "sass:math";
  
  $max_events_group: 500;

  // @keyframes raf-bubble-open {
  //   0% {
  //     display: block !important;
  //   }
  //   100% {
  //     display: block !important;
  //   }
  // }

  // %raf-itemBack {

  // }

  // @mixin raf-bubble {
  //   @for $i from 1 through $max_events_group {
  //   }
  // }

  // @include raf-bubble;


  .raf-bubbleBack {
    display: none;
    position: relative;
    &--open {
      display: block;
    }
  }
  
  .raf-item {
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
    position: inherit;
  }
  .live-events-feed-item--open {
    z-index: 0;
    position: inherit;
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
    &-images {
      position: relative;
    }
    &-icon {
      width: 2.6rem;
    }
    &-display {
      display: flex;
      flex-direction: column;
      line-height: 1.5;
      &-text {
        color: var(--live-events-feed-item--display-color);
      }
      &--observation {
        font-size: 1.12rem;
      }
    }
  }
  .live-events-feed-group--show >>> .live-events-feed-item {
    position: relative !important;
  }

  .lottie--confetti-docs {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    position: fixed;
  }
</style>
