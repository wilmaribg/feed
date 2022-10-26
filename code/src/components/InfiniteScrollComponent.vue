<template>
  <slot name="after"></slot>
  <div 
    :id="elId" 
    :style="{ 
      height,
      'scroll-behavior': scrollBehavior,
      'overflow-y': disableScroll ? 'hidden' : 'auto'
    }"
    class="Infinitescroll"
  >
    <!-- class="Infinitescroll mr-6" -->
    <slot :smController="smController" :scrollTo="scrollTo"></slot>
  </div>
  <slot name="before"></slot>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid'
import { Controller } from 'scrollmagic'
import { ref, defineProps, onMounted, defineEmits, inject } from 'vue'

let scrollPos = 'bottom' 
const elId = uuidv4()
const smController = ref({})
const $emitter = inject('$emitter')
const emit = defineEmits(['onTop'])
const props = defineProps({
  data: Array,
  height: Number,
  scrollBehavior: {
    type: String,
    default: 'smooth',
  },
  disableScroll: {
    type: Boolean,
    default: false
  },
  indicators: Boolean,
})
const scrollHandler = () => {
  const container = document.getElementById(elId)
  const scrollTop = container.scrollTop 
  const scrollHeight = container.scrollHeight 
  const offsetHeight = container.offsetHeight 
  if (scrollTop == 0) {
    scrollPos = 'top'
    emit('onTop')
  } else if (scrollTop + offsetHeight + 100 > scrollHeight) {
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
    container.scrollTop = container.scrollHeight + 1000
    setTimeout(() => callback(scrollPos), 500)
  } else {
    callback(scrollPos)
  }
} 

onMounted(() => {
  const container = document.getElementById(elId)
  container.onscroll = scrollHandler
  smController.value = new Controller({ container, addIndicators: props.indicators })


  if (props.parent) {
    const { top, height } = document.querySelector(props.parent).getBoundingClientRect()
    console.log(top, height)
    console.log(container.nextElementSibling)
    // const nextSibling = container.nextElementSibling.getBoundingClientRect().height
    // const previousSibling = container.previousElementSibling.getBoundingClientRect().height
    // console.log('props.parent --->', props.parent, (height - top), nextSibling, previousSibling, nextSibling, previousSibling)
    // container.style.height = (height - top) - nextSibling - previousSibling + 'px'
  }





  // const containerTop = container.getBoundingClientRect().top
  // container.style.height = `calc(99vh - ${containerTop}px)`
  // $emitter.on('onChangeZoom', value => {
  //   console.log('roge onChangeZoom ------>', value, container.getBoundingClientRect())
  //   const containerTop = container.getBoundingClientRect().top + 50
  //   const containerBottom = container.getBoundingClientRect().bottom + 50
  //   container.style.height = `calc(99vh + ${containerBottom}px - ${containerTop}px)`
  // })
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
    overflow-x: hidden;
    scroll-behavior: smooth;
    animation-name: animate;
    animation-duration: 5s;
    animation-fill-mode: forwards;
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      background-color: #F5F5F5;
    }
    &::-webkit-scrollbar {
      width: 12px;
      background-color: #F5F5F5;
    }
    &::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #555;
    }
  }
</style>


