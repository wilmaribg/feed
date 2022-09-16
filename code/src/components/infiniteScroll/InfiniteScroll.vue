<template>
  <div :id="selector" class="infiniteScroll-container">
    <slot name="body"></slot>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'InifinteScroll',
  emits: ['onEnd'],
  setup(props, context) {
    const selector = uuidv4()
    
    onMounted(() => {
      const element = document.getElementById(selector)
      element.scrollTop = element.scrollHeight
      element.addEventListener('scroll', ({ target }) => {
        if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
          context.emit('onEnd')
        }
      })
    })

    return { selector }
  }
}
</script>

<style scoped lang="scss">
  .infiniteScroll-container {
    display: grid;
    overflow-y: scroll;
    height: 100%;
    margin: 1rem;
    padding: 1rem 1rem 5rem 1rem;
  }
</style>