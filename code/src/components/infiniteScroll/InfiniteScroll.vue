<template>
  <div :id="selector" class="infiniteScroll-container">
    <slot name="body" 
      :moveToBottom="moveToBottom" 
      :msController="msController" 
      :test="test"/>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { onMounted, ref } from 'vue'
import { Controller } from 'scrollmagic'

export default {
  name: 'InifinteScroll',
  emits: ['onEnd'],
  setup() {
    const selector = uuidv4()
    const isScrollEnd = ref(true)
    const msController = ref(Controller)

    const moveToBottom = () => {
      console.log('roge moveToBottom ----->', isScrollEnd.value)
      if (!isScrollEnd.value) return
      const element = document.getElementById(selector)
      element.scrollTop = element.scrollHeight
    }
    
    onMounted(() => {
      const element = document.getElementById(selector)
      element.scrollTop = element.scrollHeight
      element.addEventListener('scroll', ({ target }) => {
        isScrollEnd.value = target.scrollTop + target.clientHeight >= target.scrollHeight
      })
      msController.value = new Controller({ 
        loglevel: 0, 
        container: element 
      })
    })

    return { selector, msController, moveToBottom }
  }
}
</script>

<style scoped lang="scss">
  .infiniteScroll-container {
    display: grid;
    overflow-y: scroll;
    height: 100%;
    margin: 1rem 1rem 5rem 1rem;
    padding: 1rem 1rem 5rem 1rem;
    grid-template-rows: 1fr 0fr;
    align-items: self-end;
  }
</style>