<template>
  <div :id="selector" class="lottie-confetti-docs"></div>
</template>

<script setup>
  import { v4 as uuidv4 } from 'uuid'
  import { loadAnimation } from 'lottie-web'
  import { ref, defineProps, onMounted } from 'vue'
  
  const selector = ref(uuidv4())

  const props = defineProps({
    loop: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    animationData: {
      type: Object,
      required: true
    },
  })

  onMounted(() => {
    if (!props.animationData) return
    
    const container = document.getElementById(selector.value)
    
    const animation = loadAnimation({
      container,
      renderer: 'svg',
      loop: props.loop,
      autoplay: props.autoplay,
      animationData: props.animationData
    })

    window['anim'] = animation

    console.log('container --->', container, animation)
  })
</script>

<style>
  :root {
    --lottie-confetti-docs--width: auto;
  }
</style>

<style scoped lang="scss">
  .lottie-confetti-docs {
    top: 0;
    left: -150%;
    position: absolute;
    width: var(--lottie-confetti-docs--width);
  }
</style>
