<template>
  <div :id="elId" class="InfinitescrollItem">
    <slot :elSelector="elId"></slot>
  </div>
</template>

<script setup>
import { Scene } from 'scrollmagic'
import { v4 as uuidv4 } from 'uuid'
import { ref, inject, defineProps, onMounted, defineEmits } from 'vue'

const elId = uuidv4()
const isRead = ref(false)
const $emitter = inject('$emitter')
const emit = defineEmits(['onRead'])
const props = defineProps({
  once: Boolean,
  event: Object,
  index: String,
  scrollTo: {
    type:Function,
    required: true
  },
  smController: {
    type:Object,
    required: true
  },
})

onMounted(() => {
  const triggerElement = document.getElementById(elId)
  const height = triggerElement.offsetHeight
  const scene = new Scene({
    offset: height/3,
    triggerHook: 1,
    triggerElement
  })
  scene.on('enter', () => emit('onRead', { status: 'ok', uuid: elId }))
  scene.setClassToggle(triggerElement, 'Bubble--animate')
  props.smController.addScene(scene)
  props.scrollTo(null, scrollPos => {
    props.once ? scene.removeClassToggle() : null
    if (!isRead.value && scrollPos == 'bottom') {
      isRead.value = true
      emit('onRead', { status: 'ok', uuid: elId })
    } else {
      emit('onRead', { status: 'pending', uuid: elId })
    }
  })
  $emitter.on('feed:moveToIndex', index => {
    if (index != props.index) return 
    triggerElement.scrollIntoView({block: 'start', behavior: 'auto'})
  })
  $emitter.on('feed:moveToEvent', id => {
    if (id != props.event.id) return 
    triggerElement.scrollIntoView({block: 'start', behavior: 'auto'})
  })
  if (props.event.moveTo) props.scrollTo(null, Function)
})
</script>

<style scoped lang="scss">
  .InfinitescrollItem {
    // margin-bottom: 1rem;
  }
</style>


