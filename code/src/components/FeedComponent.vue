<template>
  <InfiniteScroll
    class="FeedComponent"
    :scroll-behavior="isLoading ? 'unset' : 'smoot'"
    :height="iHeight"
    :data="events">
    <template #default="{smController, scrollTo}">
      <InfiniteScrollItem 
        v-for="(event, index) in events" :key="index"
        @onRead="onReadItem"
        :index="index"
        :scrollTo="scrollTo" 
        :smController="smController"
        :event="event">
        <template #default>
          <template v-if="event && event.data">
            <div class="columns">
              <div class="column is-narrow">
                <div>
                  <Avatar 
                    animate 
                    :photo="event.data.user.photo"  
                    width="100px" 
                    height="100px" 
                  />
                </div>
                <div 
                  v-if="get(event, 'data.responsible.photo')" 
                  class="is-flex is-justify-content-center"
                  style="z-index: 1; margin-top: -1rem;" 
                >
                  <Avatar 
                    animate 
                    :photo="event.data.responsible.photo"  
                    width="80px" 
                    height="80px"
                  />
                </div>
              </div>
              <div class="column">
                <span class="is-size-4" style="color: var(--el-text-color-secondary);">
                  {{ moment(event.createdAt).fromNow() }}
                </span>
                <Bubble 
                  :event="event" 
                  :icon="event.data.icon"
                  :animate="event.animate" 
                  :color="getColor(event)"
                  :background="getBackground(event)"
                  :lottieFullScreen="isLottieFullScreen(event)"
                  @onComplete="onComplete(event)"
                />
              </div>
            </div>
          </template>
        </template>
      </InfiniteScrollItem>
      <div class="columns">
        <div class="column my-6 has-text-centered">
          <button 
            @click="loadMore" 
            :disabled="!isEmptyResult"
            :class="{ 'is-loading': isLoading }"
            class="button is-large"
          >
            Load More
            <img 
              v-if="!isLoading"
              width="30" 
              class="ml-3" 
              :src="require('../assets/icons/icon-load-more.svg')"
            >
          </button>
        </div>
      </div>
    </template>
  </InfiniteScroll>
  <DocViewerComponent />
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid'
import { ElButton } from 'element-plus'
import { findIndex, get } from 'lodash'
import { loadAnimation } from 'lottie-web'
import { ref, inject, onMounted, defineProps } from 'vue'
import Avatar from '../components/AvatarComponent'
import Bubble from '../components/BubbleComponent'
import { UserMe, EventsPage } from '../queries/index.js'
import InfiniteScroll from '../components/InfiniteScrollComponent.vue'
import DocViewerComponent from '../components/DocViewerComponent.vue'
import InfiniteScrollItem from '../components/InfiniteScrollItemComponent.vue'

import confetti from '../assets/lotties/confetti/data.json'
import confettiDoc from '../assets/lotties/confetti-docs/data.json'

const page = ref(0)
const iHeight = ref(0)
const events = ref([])
// const elHeader = uuidv4()
const unreadItems = ref({})
const docState = ref('saved')
const isLoading = ref(false)
const isEmptyResult = ref(false)
const disableScroll = ref(false)
const socket = inject('socket')
const moment = inject('moment')
const $emitter = inject('$emitter')
const props = defineProps({
  height: Number
})

const getColor = event => event.data.color || '#ffffff'
const getBackground = event => event.data.background || '#000000'
const isLottieFullScreen = event => event.data.lottieFullScreen || false

const calculateHeight = () => {
  // if (!document.getElementById(elHeader)) return
  const pageComponent = document.querySelector('.Page.Feed').getBoundingClientRect().height
  const feedComponent = document.querySelector('.Infinitescroll').getBoundingClientRect().top
  iHeight.value = (pageComponent - (feedComponent + 50)) + 'px'
}

const srcLottie = src => {
  if (process.env.NODE_ENV != 'development') return src
  if (/confetti-docs/gi.test(src)) return confettiDoc
  return confetti
}

const showLottie = (event) => {
  const lottie = get(event, 'data.lottie')
  const container = document.getElementById(`event-lottie-${event.id}`)
  const lottieOptions = { 
    container, 
    autoplay: true, 
    renderer: 'svg',
    loop: false, 
  }
  if (!lottie || !container) return 
  
  if (process.env.NODE_ENV != 'development') lottieOptions['path'] = srcLottie(lottie)
  else lottieOptions['animationData'] = srcLottie(lottie)
  console.log('roge process.env.NODE_ENV ----->', process.env.NODE_ENV )
  const animation = loadAnimation(lottieOptions)
  animation.onComplete = () => container.remove()
}

const eventBus = inject('eventBus')(event => {
  $emitter.emit('feed:eventChangeInteractions', {
    docId: event.docId,
    count: event.data.interactions,
  })
  events.value.unshift({ ...event, socket: true })
  const sounds = get(event, 'data.sound', [])
  if (sounds.length) recursiveSound(sounds, 0)
  setTimeout(() => showLottie(event), 100)
})

const onComplete = event => {
  // delete event.data.sound
  // delete event.data.lottie
  event.animate = false
}

const onReadItem = ({ status, uuid }) => {
  if (status == 'ok') delete unreadItems.value[uuid]
  if (status == 'pending') unreadItems.value[uuid] = status
}

const recursiveSound = (sounds, index) => {
  if (!sounds[index]) return
  const audio = new Audio(sounds[index])
  audio.play()
  audio.addEventListener('ended', () => {
    let next = index + 1
    setTimeout(recursiveSound, 0, sounds, next)
  })
}

const loadMore = async () => {
  try {
    isLoading.value = true
    let id 
    const eventsCopy = events.value
    const docs = await EventsPage(page.value)
    events.value = []
    for (var i = docs.length - 1; i >= 0; i--) {
      if (!page.value) eventsCopy.unshift(docs[i])
      else eventsCopy.push(docs[i])
    }
    events.value = eventsCopy
    page.value += 1
    isLoading.value = false
    isEmptyResult.value = Boolean(docs.length)
  } catch (err) {
    console.log(err)
  }
}

const reloadEvents = (data, index) => {
  let id
  const copyEvents = JSON.parse(JSON.stringify(data || []))
  events.value = []
  setTimeout(() => {
    for (let i = 0; i < copyEvents.length; i++) {
      if (i == index) id = copyEvents[i].id
      copyEvents[i].animate = false
      events.value.push(copyEvents[i])
    }
    setTimeout(() => $emitter.emit('feed:moveToEvent', id), 1)
  }, 1)
}

onMounted(async () => {
  try {
    await loadMore()
    calculateHeight()
    const me = await UserMe()
    socket.on(me.id, eventBus.add)
    $emitter.on('onChangeZoom', value => calculateHeight())
    $emitter.on('bubble:deleteEvent', id => {
      let index = findIndex(events.value, e => e.id == id)
      if (index > -1) events.value.splice(index, 1)
      reloadEvents(events.value, index - 1)
    })
    $emitter.on('bubble:deleteEventSiblings', async (docId) => {
      let i = 0
      let index = 0
      while (i < events.value.length) {
        if (events.value[i].docId === docId) {
          events.value.splice(i, 1)
          index = i
        } else {
          ++i
        }
      }
      reloadEvents(events.value, index - 1)
    })
  } catch (err) {
    console.log(err)
  }
})
</script>

<style scoped lang="scss">
  .FeedComponent {
    &-items {
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
    }
    &-loadmore {
      // position: absolute;
      // width: 100%;
      // z-index: 1;
      // top: 0;
    }
    &-itemsLoadMore {
      text-align: center;
      position: absolute;
      color: white;
      width: 100%;
      z-index: 1;
      top: 0;
    }
  } 
</style>



