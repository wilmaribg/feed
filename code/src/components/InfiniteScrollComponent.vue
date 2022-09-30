<template>
  <slot name="after"></slot>
  <div :id="elId" class="Infinitescroll" :style="{ height }">
    <slot :smController="smController" :scrollTo="scrollTo"></slot>
  </div>
  <slot name="before"></slot>
</template>

<script setup>
import 'scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js'
import { Controller } from 'scrollmagic'
import { v4 as uuidv4 } from 'uuid'
import { ref, defineProps, onMounted, defineEmits } from 'vue'

let scrollPos = 'bottom' 
const elId = uuidv4()
const smController = ref({})
const emit = defineEmits(['onTop'])
const props = defineProps({
  data: Array,
  indicators: Boolean,
  height: { type:String, default: '300px' },
})
const scrollHandler = event => {
  const container = document.getElementById(elId)
  const scrollTop = container.scrollTop 
  const scrollHeight = container.scrollHeight 
  const offsetHeight = container.offsetHeight 
  if (scrollTop == 0) {
    scrollPos = 'top'
    emit('onTop')
  } else if (scrollTop + offsetHeight == scrollHeight) {
    scrollPos = 'bottom'
  } else {
    scrollPos = 'center'
  }
}
const scrollTo = (scene, callback = Function) => {
  if (scene) {
    smController.value.scrollTo(scene)
    setTimeout(() => callback(scrollPos), 500)
  } else if (scrollPos == 'bottom') {
    const container = document.getElementById(elId)
    container.scrollTop = container.scrollHeight
    setTimeout(() => callback(scrollPos), 500)
  } else {
    callback(scrollPos)
  }
} 

onMounted(() => {
  const container = document.getElementById(elId)
  container.onscroll = scrollHandler
  smController.value = new Controller({ container, addIndicators: props.indicators })
})
</script>

<style scoped lang="scss">
  @keyframes animate {
    100% {
      opacity: 1;
    }
  }
  .Infinitescroll {
    opacity: .8;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
    animation-name: animate;
    animation-duration: 5s;
    animation-fill-mode: forwards;
  }
</style>


