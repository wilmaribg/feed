<script setup>
  import { get } from 'lodash'
  import iconHot from '@/assets/icons/icn-hot.svg'
  import iconWarm from '@/assets/icons/icn-warm.svg'
  import LiveEventsFeedGlobeMixin from '@/mixins/LiveEventsFeedGlobeMixin.js'
  import LiveEventsFeedGlobe from '@/components/liveEventsFeed/LiveEventsFeedGlobe.vue'
  import confettiDocs from '@/assets/lotties/confetti-docs/data.json'

  const getIcon = event => {
    const display = get(event, 'data.display')
    if (/hot/gi.test(display)) return iconHot
    return iconWarm
  }

  const getTone = event => {
    const display = get(event, 'data.display')
    if (/hot/gi.test(display)) return '/sounds/hot.mp3'
    if (/warm/gi.test(display)) return '/sounds/warm.mp3'
  }

  const getLottie = event => {
    const source = get(event, 'source')
    const display = get(event, 'data.display')
    if (source != 'socket') return
    if (/hot|warm/gi.test(display)) return confettiDocs
  }

  const getTcolor = event => {
    const display = get(event, 'data.display')
    if (/hot|warm/gi.test(display)) return '#808080'
    return '#ffffff'
  }

  const getColor = event => {
    const display = get(event, 'data.display')
    if (/hot/gi.test(display)) return '#d21b5c'
    if (/warm/gi.test(display)) return '#fdbd00'
    return '#ffffff'
  }
</script>

<template>
  <LiveEventsFeedGlobe 
    :lottieAnimationData="getLottie(event)"
    :color="getColor(event)"
    :oColor="getColor(event)"
    :tColor="getTcolor(event)"
    :iconSrc="getIcon(event)"
    :tone="getTone(event)"
    :index="index"
    :event="event"/>
</template>

<script>
export default {
  mixins: [
    LiveEventsFeedGlobeMixin
  ]
}
</script>

<style scoped lang="scss">

</style>
