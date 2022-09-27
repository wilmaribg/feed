<template>
  <div 
    :id="id" 
    :class="{'feed-group--open': isCollapse}"
    class="feed-group">
    <div class="feed-groupAvatar">
      <AvatarComponent width="5.1rem" height="5.1rem" :src="get(group, 'avatar', 'does not exists')"/>
    </div>
    <div class="feed-groupInfo">
      <template v-for="(event, index) in $filters.sortByDate(events, 'updatedAt', -1)" v-bind:key="event.id">
        <component 
          :index="index"
          :event="event"
          @onCollapse="onCollapse"
          :msController="$props.msController"
          :is="getItemByMethod(event.method)"/>
      </template>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash'
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
    const id = uuidv4()
    const isCollapse = ref(false)
    
    const onCollapse = (_isCollapse) => {
      isCollapse.value = _isCollapse
      document.getElementById(id).scrollIntoView({ 
        // behavior: 'smooth',
        // block: isOpen ? 'end' : 'start', 
        // block: 'start', 
      })
    }
  
    onMounted(() => {
      context.emit('onMounted')
    })

    return { id, onCollapse, isCollapse }
  }
}
</script>

<style scoped lang="scss">
  @import '@/assets/styles/stylesAnimationsLiveEventsFeedIn.scss';
  .feed-group {
    gap: 1rem;
    display: grid;
    grid-template-columns: 1fr 12fr;
    background: rgba(0, 0, 0, .005);
    &--open {
      .feed-groupInfo {
        margin-bottom: 1rem;
        border-radius: 0.5rem;
        padding: 1rem 1rem 0 1rem;
        background: rgba(225, 225, 255, 0.1);
        :deep(.raf-bubbleBack) {
          opacity: 0.75;
        }
      }
    }
  }
  .feed-groupAvatar {
    text-align: center; 
  }
  .feed-groupInfo {
    position: relative;
  }
</style>


