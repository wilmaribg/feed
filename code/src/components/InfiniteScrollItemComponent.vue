<template>
  <div :id="elId" class="InfinitescrollItem">
    <slot></slot>
  </div>
</template>

<script setup>
import { Scene } from 'scrollmagic'
import { v4 as uuidv4 } from 'uuid'
import { ref, defineProps, onMounted, defineEmits } from 'vue'

const elId = uuidv4()
const emit = defineEmits(['onRead'])
const isRead = ref(false)
const props = defineProps({
  once: Boolean,
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
})
</script>

<style scoped lang="scss">
  .InfinitescrollItem {
    margin-bottom: 1rem;
  }
</style>


