<template>
  <div :id="selector" class="lottie-logo"></div>
</template>

<script setup>
  import { v4 as uuidv4 } from 'uuid'
  import { loadAnimation } from 'lottie-web'
  import { ref, onMounted } from 'vue'
  import logo from '@/assets/lotties/logo-animation.json'
  
  const selector = ref(uuidv4())

  onMounted(() => {  
    const container = document.getElementById(selector.value)
    loadAnimation({
      container,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: logo
    })
  })
</script>

<style scoped lang="scss">
  .lottie-logo {
    width: max-content;
  }
</style>
