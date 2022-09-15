<script setup>
import { get } from 'lodash'

import LiveEventsFeedGlobeOpened from '@/components/liveEventsFeed/LiveEventsFeedGlobeOpened.vue'
import LiveEventsFeedGlobeCreate from '@/components/liveEventsFeed/LiveEventsFeedGlobeCreate.vue'
import LiveEventsFeedGlobeUpdate from '@/components/liveEventsFeed/LiveEventsFeedGlobeUpdate.vue'
import LiveEventsFeedGlobeDestroy from '@/components/liveEventsFeed/LiveEventsFeedGlobeDestroy.vue'
import LiveEventsFeedGlobeOnRating from '@/components/liveEventsFeed/LiveEventsFeedGlobeOnRating.vue'
import LiveEventsFeedGlobeChangeStatus from '@/components/liveEventsFeed/LiveEventsFeedGlobeChangeStatus.vue'
import LiveEventsFeedGlobeSetResponsible from '@/components/liveEventsFeed/LiveEventsFeedGlobeSetResponsible.vue'
import LiveEventsFeedGlobeOnUnpublishProposal from '@/components/liveEventsFeed/LiveEventsFeedGlobeOnUnpublishProposal.vue'

const getItemByMethod = method => { 
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

</script>

<template>
  <div class="live-events-feed-group">
    <div class="live-events-feed-group--avatar">
      <AvatarComponent width="5.1rem" height="5.1rem" :src="get(group, 'avatar', 'does not exists')"/>
    </div>
    <div class="live-events-feed-group--info">
      <template v-for="event in $filters.sortByDate(events, 'updatedAt')" v-bind:key="event.id">
        <template v-if="group.id == get(event, 'docId')">
          <component :is="getItemByMethod(event.method)" :event="event"/>
        </template>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LiveEventsFeedGroup',
  props: ['group', 'events']
}
</script>

<style scoped lang="scss">
  .live-events-feed-group {
    display: grid;
    grid-template-columns: 1fr 12fr;
    background: rgba(0, 0, 0, .005);
    gap: 1rem;
  }
</style>
