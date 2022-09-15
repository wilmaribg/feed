<script setup>
  import { get } from 'lodash'
  import iconHot from '@/assets/icons/icn-hot.svg'
  import iconWarm from '@/assets/icons/icn-warm.svg'
  import LiveEventsFeedGlobe from '@/components/liveEventsFeed/LiveEventsFeedGlobe.vue'

  const getIcon = (event) => {
    const display = get(event, 'data.display')
    if (/hot/gi.test(display)) return iconHot
    return iconWarm
  }
</script>

<template>
  <LiveEventsFeedGlobe 
    :icon="getIcon(event)"
    :event="event" />
</template>

<script>
export default {
  name: 'LiveEventsFeedOpened',
  props: ['event']
}
</script>

<style scoped lang="scss">

</style>
