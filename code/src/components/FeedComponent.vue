<template>
  <InfiniteScroll
    class="FeedComponent"
    :height="iHeight"
    :data="events">
    <template #after>
      <div :id="elHeader" class="columns">
        <div class="column">
          <strong class="has-text-white mb-3 is-block">
            Unread Items: {{Object.keys(unreadItems).length}} of {{events.length}}
          </strong>   
        </div>
        <div class="column is-narrow mr-6">
          <PageZoomComponent />
        </div>
      </div>
    </template>
    <template #default="{smController, scrollTo}">
      <InfiniteScrollItem 
        v-for="(event, index) in events" :key="index"
        @onRead="onReadItem"
        :index="index"
        :scrollTo="scrollTo" 
        :smController="smController"
        :event="event">
        <template #default>
          <div class="columns">
            <div class="column is-narrow">
              <Avatar animate :photo="event.data.user.photo"  width="100px" height="100px"/>
            </div>
            <div class="column is-clipped">
              <span class="is-size-4" style="color: var(--el-text-color-secondary);">
                {{ moment(event.createdAt).fromNow() }}
              </span>
              <Bubble :event="event" />
            </div>
          </div>
        </template>
      </InfiniteScrollItem>
      <!-- <div class="FeedComponent-itemsLoadMore">
        <el-button @click="loadMore" size="large" type="info" round>
          <span class="is-size-4">Load More</span>
        </el-button>
      </div> -->
    </template>
  </InfiniteScroll>
  <DocViewerComponent />
</template>

<script setup>
import { findIndex } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { ElButton } from 'element-plus'
import { ref, inject, onMounted, defineProps } from 'vue'
import Avatar from '../components/AvatarComponent'
import Bubble from '../components/BubbleComponent'
import { UserMe, EventsPage } from '../queries/index.js'
import InfiniteScroll from '../components/InfiniteScrollComponent.vue'
import PageZoomComponent from '../components/page/PageZoomComponent.vue'
import DocViewerComponent from '../components/DocViewerComponent.vue'
import InfiniteScrollItem from '../components/InfiniteScrollItemComponent.vue'

const page = ref(0)
const iHeight = ref(0)
const events = ref([])
const elHeader = uuidv4()
const unreadItems = ref({})
const docState = ref('saved')
const disableScroll = ref(false)
const socket = inject('socket')
const moment = inject('moment')
const $emitter = inject('$emitter')
const props = defineProps({
  height: Number
})

const calculateHeight = () => {
  if (!document.getElementById(elHeader)) return
  const pageComponent = document.querySelector('.Page.Feed').getBoundingClientRect().height
  const feedComponent = document.querySelector('.Infinitescroll').getBoundingClientRect().top
  iHeight.value = (pageComponent - (feedComponent + 50)) + 'px'
}
 
const eventBus = inject('eventBus')(event => {
  $emitter.emit('feed:eventChangeInteractions', {
    docId: event.docId,
    count: event.data.interactions,
  })
  events.value.push({ ...event, socket: true })
})

const onReadItem = ({ status, uuid }) => {
  if (status == 'ok') delete unreadItems.value[uuid]
  if (status == 'pending') unreadItems.value[uuid] = status
}

const loadMore = async () => {
  try {
    const docs = await EventsPage(page.value)
    for (let i = 0; i < docs.length; i++) {
      events.value.unshift({ ...docs[i], moveTo: i == 0 })
    }
    page.value += 1
    $emitter.emit('feed:moveToIndex', 9)
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  try {
    await loadMore()
    calculateHeight()
    const me = await UserMe()
    socket.on(me.id, eventBus.add)
    $emitter.on('onChangeZoom', value => calculateHeight())
    $emitter.on('bubble:deleteEvent', id => {
      let index = findIndex(events.value, e => event.id == id)
      if (index > -1) events.value.splice(index, 1)
    })
    $emitter.on('bubble:deleteEventSiblings', async (docId) => {
      let i = 0
      while (i < events.value.length) {
        if (events.value[i].docId === docId) events.value.splice(i, 1)
        else ++i
      }
      await loadMore()
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



