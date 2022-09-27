<script setup>
  import { get } from 'lodash'
  import icon from '@/assets/icons/icn-edit.svg'
  import iconReady from '@/assets/icons/icn-ready.svg'
  import iconDenied from '@/assets/icons/icn-denied.svg'
  import iconApproved from '@/assets/icons/icn-approved.svg'
  import LottiesConfetti from '@/components/lotties/LottiesConfetti.vue'
  import LiveEventsFeedGlobeMixin from '@/mixins/LiveEventsFeedGlobeMixin.js'
  import LiveEventsFeedGlobe from '@/components/liveEventsFeed/LiveEventsFeedGlobe.vue'

  const isApproved = event => {
    const display = get(event, 'data.display')
    const source = get(event, 'source')
    if (source != 'socket')  return
    return /approved/gi.test(display)
  } 

  const getBackground = event => {
    const display = get(event, 'data.display')
    if (/ready/gi.test(display)) return 'rgb(66,133,244)'
    if (/denied/gi.test(display)) return 'rgb(212,20,90)'
    if (/approved/gi.test(display)) return 'rgb(57,181,74)'
  }
  
  const getTone = (event, $publicPath) => {
    const display = get(event, 'data.display')
    if (/ready/gi.test(display)) return $publicPath + '/sounds/ready.mp3'
    if (/denied/gi.test(display)) return $publicPath + '/sounds/denied.mp3'
    if (/approved/gi.test(display)) return $publicPath + '/sounds/approved-1.mp3'
  }

  const getIcon = event => {
    const display = get(event, 'data.display')
    if (/ready/gi.test(display)) return iconReady
    if (/denied/gi.test(display)) return iconDenied
    if (/approved/gi.test(display)) return iconApproved
    return icon
  }

  const getColor = event => {
    const display = get(event, 'data.display')
    if (/approved|denied/gi.test(display)) return '#000000'
    return '#ffffff'
  }
  
  const getTcolor = event => {
    const display = get(event, 'data.display')
    if (/ready|denied/gi.test(display)) return '#2e2e2e'
    if (/approved/gi.test(display)) return '#808080'
    return '#ffffff'
  }
</script>

<template>
  <template v-if="isApproved(event)">
    <LottiesConfetti 
      style="
        --lottie-confetti-docs--width: 100vw;
        --lottie-confetti-docs--height: 100vh;
      "/>
  </template>
  <LiveEventsFeedGlobe 
    :tColor="getTcolor(event)"
    :iconSrc="getIcon(event)"
    :color="getColor(event)"
    :tone="getTone(event, $publicPath)"
    :index="index"
    :background="getBackground(event)"
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
