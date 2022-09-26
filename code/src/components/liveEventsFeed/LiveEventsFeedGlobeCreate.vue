<script setup>
  import icon from '@/assets/icons/icn-create.svg'
  import LiveEventsFeedGlobeMixin from '@/mixins/LiveEventsFeedGlobeMixin.js'
  import LiveEventsFeedGlobe from '@/components/liveEventsFeed/LiveEventsFeedGlobe.vue'
</script>

<template>
  <LiveEventsFeedGlobe 
    tone="/sounds/click.mp3"
    color="#4285f4"
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
