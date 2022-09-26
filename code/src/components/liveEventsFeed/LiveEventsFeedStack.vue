<template>
  <div :id="selector" :class="{'live-events-feed-group--show': isSeenAll }" class="live-events-feed-group">
    <div class="live-events-feed-group--avatar">
      <AvatarComponent width="5.1rem" height="5.1rem" :src="get(group, 'avatar', 'does not exists')"/>
    </div>
    <div class="live-events-feed-group--info">
      <template v-for="(event, index) in $filters.sortByDate(events, 'updatedAt', -1)" v-bind:key="event.id">
        <component 
          :index="index"
          :event="event"
          @onSeeAll="onSeeAll"
          :msController="$props.msController"
          :is="getItemByMethod(event.method)"/>
      </template>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash'
// import { Scene } from 'scrollmagic'
import { v4 as uuidv4 } from 'uuid'
import { onMounted, ref } from 'vue'

import LiveEventsFeedGlobeOpened from '@/components/liveEventsFeed/LiveEventsFeedGlobeOpened.vue'
import LiveEventsFeedGlobeCreate from '@/components/liveEventsFeed/LiveEventsFeedGlobeCreate.vue'
import LiveEventsFeedGlobeUpdate from '@/components/liveEventsFeed/LiveEventsFeedGlobeUpdate.vue'
import LiveEventsFeedGlobeDestroy from '@/components/liveEventsFeed/LiveEventsFeedGlobeDestroy.vue'
import LiveEventsFeedGlobeOnRating from '@/components/liveEventsFeed/LiveEventsFeedGlobeOnRating.vue'
import LiveEventsFeedGlobeChangeStatus from '@/components/liveEventsFeed/LiveEventsFeedGlobeChangeStatus.vue'
import LiveEventsFeedGlobeSetResponsible from '@/components/liveEventsFeed/LiveEventsFeedGlobeSetResponsible.vue'
import LiveEventsFeedGlobeOnUnpublishProposal from '@/components/liveEventsFeed/LiveEventsFeedGlobeOnUnpublishProposal.vue'

export default {
  name: 'LiveEventsFeedStack',
  props: ['group', 'events', 'msController'],
  methods: {
    get,
    getItemByMethod(method) { 
      if (/opened/gi.test(method)) return LiveEventsFeedGlobeOpened
      if (/create/gi.test(method)) return LiveEventsFeedGlobeCreate
      if (/update/gi.test(method)) return LiveEventsFeedGlobeUpdate
      if (/destroy/gi.test(method)) return LiveEventsFeedGlobeDestroy
      if (/onRating/gi.test(method)) return LiveEventsFeedGlobeOnRating
      if (/changeStatus/gi.test(method)) return LiveEventsFeedGlobeChangeStatus
      if (/setResponsible/gi.test(method)) return LiveEventsFeedGlobeSetResponsible
      if (/onUnpublishProposal/gi.test(method)) return LiveEventsFeedGlobeOnUnpublishProposal
      return null
    }
  },
  setup(props, context) {
    const selector = uuidv4()
    const isSeenAll = ref(false)
    
    const onSeeAll = () => {
      isSeenAll.value = true
    }
  
    onMounted(() => {
      context.emit('onMounted')
    //   if (props.msController) {
    //     const triggerElement = document.getElementById(selector)
    //     const scene = new Scene({ 
    //       triggerElement,
    //       reverse: false,
    //       triggerHook: 1,
    //       offset: 10
    //     })
    //     scene.on('enter', () => {
    //       // triggerElement.classList.add('live-events-feed-group--animate-in')
    //       // triggerElement.classList.remove('live-events-feed-group--animate-out')
    //     })
    //     scene.on('leave', () => {
    //       // triggerElement.classList.add('live-events-feed-group--animate-out')
    //       // triggerElement.classList.remove('live-events-feed-group--animate-in')
    //     })
    //     scene.addTo(props.msController)
    //   }
    })
    return { selector, isSeenAll, onSeeAll }
  }
}
</script>

<style scoped lang="scss">
  @import '@/assets/styles/stylesAnimationsLiveEventsFeedIn.scss';
  .live-events-feed-group {
    gap: 1rem;
    display: grid;
    grid-template-columns: 1fr 12fr;
    background: rgba(0, 0, 0, .005);
    margin-bottom: 1rem;
    padding-bottom: 2rem;
  }
  .live-events-feed-group--avatar {
    text-align: center; 
  }
  .live-events-feed-group--info {
    position: relative;
  }
</style>


