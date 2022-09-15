<script setup>
  import icon from '@/assets/icons/icn-view.svg'
  import LiveEventsFeedGlobe from '@/components/liveEventsFeed/LiveEventsFeedGlobe.vue'
</script>

<template>
  <LiveEventsFeedGlobe 
    :icon="icon"
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
