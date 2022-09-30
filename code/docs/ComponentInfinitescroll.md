<script setup>
import 'bootstrap/dist/css/bootstrap-grid.css'
import 'element-plus/dist/index.css'
import '../src/styles/root-vars.scss'
import { ref, onMounted } from 'vue'
import Avatar from '../src/components/AvatarComponent.vue'
import Bubble from '../src/components/BubbleComponent.vue'
import InfiniteScroll from '../src/components/InfiniteScrollComponent.vue'
import InfiniteScrollItem from '../src/components/InfiniteScrollItemComponent.vue'

const events = ref([])
const animate = ref(false)
const unreadItems = ref({})
const animateF = () => {
  animate.value = false
  setTimeout(() => animate.value = true, 500)
}
const loadMore = () => {
  alert('Load More...')
}
const onReadItem = ({ status, uuid }) => {
  if (status == 'ok') delete unreadItems.value[uuid]
  if (status == 'pending') unreadItems.value[uuid] = status
}
onMounted(() => {
  events.value = new Array(5).fill({})
})
</script>

# Bubble

Bubble component

## Basic Usage:

```html
<InfiniteScroll indicators height="700px" :data="events" @onTop="loadMore">
  <template #after>
    <div>
      <strong>Unread Items: {{Object.keys(unreadItems).length}}</strong>   
    </div>
    <br>
  </template>
  <template #default="{smController, scrollTo}">
    <InfiniteScrollItem  
      @onRead="onReadItem"
      :scrollTo="scrollTo" 
      :smController="smController" 
      v-for="(event, key) in events" 
      :key="key">
      <div class="row">
        <div class="col-2">
          <Avatar :animate="animate" width="100px" height="100px"/>
        </div>
        <div class="col-10" style="font-size: 12px;">
          <Bubble :animate="animate"/>
        </div>
      </div> 
    </InfiniteScrollItem>
  </template>  
</InfiniteScroll>
```
<div><button @click="animateF">See animation</button>  </div> 
<div><button @click="events.push({})">Push Event</button>  </div> 
<br>
<InfiniteScroll indicators height="700px" :data="events" @onTop="loadMore">
  <template #after>
    <div>
      <strong>Unread Items: {{Object.keys(unreadItems).length}}</strong>   
    </div>
    <br>
  </template>
  <template #default="{smController, scrollTo}">
    <InfiniteScrollItem  
      @onRead="onReadItem"
      :scrollTo="scrollTo" 
      :smController="smController" 
      v-for="(event, key) in events" 
      :key="key">
      <div class="row">
        <div class="col-2">
          <Avatar :animate="animate" width="100px" height="100px"/>
        </div>
        <div class="col-10" style="font-size: 12px;">
          <Bubble :animate="animate"/>
        </div>
      </div> 
    </InfiniteScrollItem>
  </template>  
</InfiniteScroll>

## Attributes: