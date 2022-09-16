<script setup>
  import { get } from 'lodash'
  import iconHot from '@/assets/icons/icn-hot.svg'
  import iconWarm from '@/assets/icons/icn-warm.svg'
  import LiveEventsFeedGlobeMixin from '@/mixins/LiveEventsFeedGlobeMixin.js'
  import LiveEventsFeedGlobe from '@/components/liveEventsFeed/LiveEventsFeedGlobe.vue'

  const getIcon = (event) => {
    const display = get(event, 'data.display')
    if (/hot/gi.test(display)) return iconHot
    return iconWarm
  }
</script>

<template>
  <LiveEventsFeedGlobe 
    :iconSrc="getIcon(event)"
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
