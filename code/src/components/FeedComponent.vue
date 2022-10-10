<template>
  <InfiniteScroll 
    height="100%" 
    :data="events"  
    @onTop="loadMore">
    <template #after>
      <strong class="has-text-white mb-3 is-block">
        Unread Items: {{Object.keys(unreadItems).length}} of {{events.length}}
      </strong>   
    </template>
    <template #default="{smController, scrollTo}">
      <div class="Feed-items">
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
                <Bubble :event="event" />
              </div>
            </div>
          </template>
        </InfiniteScrollItem>
      </div>
    </template>
  </InfiniteScroll>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { UserMe, EventsPage } from '../queries/index.js'
import Avatar from '../components/AvatarComponent'
import Bubble from '../components/BubbleComponent'
import InfiniteScroll from '../components/InfiniteScrollComponent.vue'
import InfiniteScrollItem from '../components/InfiniteScrollItemComponent.vue'

const page = ref(0)
const events = ref([])
const unreadItems = ref({})
const docState = ref('saved')
const disableScroll = ref(false)
const socket = inject('socket')
const $emitter = inject('$emitter')

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
    const me = await UserMe()
    socket.on(me.id, eventBus.add)
  } catch (err) {
    console.log(err)
  }
})
</script>

<style scoped lang="scss">
  .Feed {
    &-items {
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
</style>



