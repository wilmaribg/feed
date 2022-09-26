<template>
  <div :id="selector" class="lottie-confetti"></div>
</template>

<script setup>
  import { v4 as uuidv4 } from 'uuid'
  import { loadAnimation } from 'lottie-web'
  import { ref, onMounted } from 'vue'
  import confetti from '@/assets/lotties/confetti/data.json'
  
  const selector = ref(uuidv4())

  onMounted(() => {  
    const container = document.getElementById(selector.value)
    const animation = loadAnimation({
      container,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: confetti
    })
    animation.onComplete = () => container.style.display = 'none'
  })
</script>

<style>
  :root {
    --lottie-confetti--width: auto;
    --lottie-confetti-docs--height: auto;
  }
</style>

<style scoped lang="scss">
  .lottie-confetti {
    top: 0;
    left: 0;
    z-index: 999;
    position: fixed;
    height: var(--lottie-confetti-docs--height);
    width: var(--lottie-confetti-docs--width);
  }
</style>
