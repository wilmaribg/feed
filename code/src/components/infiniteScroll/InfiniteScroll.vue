<template>
  <div :id="selector" class="infiniteScroll-container">
    <slot name="body" 
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
  props: ['moveToEnd'],
  setup(props, context) {
    const selector = uuidv4()
    const msController = ref(Controller)

    
    onMounted(() => {
      const element = document.getElementById(selector)
      element.scrollTop = element.scrollHeight
      element.addEventListener('scroll', ({ target }) => {
        const isScrollEnd = target.scrollTop + target.clientHeight >= target.scrollHeight
        context.emit('onScroll', isScrollEnd)
      })
      msController.value = new Controller({ 
        loglevel: 0, 
        container: element 
      })
    })

    return { selector, msController }
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