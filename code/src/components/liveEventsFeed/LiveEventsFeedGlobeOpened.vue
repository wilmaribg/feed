<script setup>
  import { get } from 'lodash'
  import icon from '@/assets/icons/icn-view.svg'
  import LiveEventsFeedGlobeMixin from '@/mixins/LiveEventsFeedGlobeMixin.js'
  import LiveEventsFeedGlobe from '@/components/liveEventsFeed/LiveEventsFeedGlobe.vue'

  const getTone = event => {
    const display = get(event, 'data.display')
    if (/by 1 time/gi.test(display)) return '/sounds/first-seen.mp3'
    return '/sounds/first-seen.mp3'
  }
</script>

<template>
  <LiveEventsFeedGlobe 
    oColor="#ffffff"
    :tone="getTone(event)"
    :iconSrc="icon"
    :index="index"
    :event="event"/>
</template>

<script>
export default {
  name: 'LiveEventsFeedOpened',
  mixins: [LiveEventsFeedGlobeMixin]
}
</script>

<style scoped lang="scss">

</style>
