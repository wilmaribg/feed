<template>
  <div class="Docviewer" :class="{ 
      'Docviewer-isOpen': isOpen, 
      'Docviewer-isClose': !isOpen 
    }">
    <div>
      <div class="mt-6 has-background-black Docviewer-section--boxshadow">
        <div>
          <button @click="isOpen=false" class="button is-fullwidth is-large is-dark is-outlined has-text-white">
            <i class="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div>
          <a :href="url" target="__blank" class="button is-fullwidth is-large is-dark is-outlined has-text-white">
            <i class="fa fa-external-link" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="Docviewer-section--boxshadow">
      <iframe 
        width="100%" 
        height="100%" 
        :src="url" 
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script setup> 
import { ref, onMounted, inject } from 'vue'

const url = ref(false)
const isOpen = ref(undefined)
const $emitter = inject('$emitter')

onMounted(() => {
  $emitter.on('docViewer:open', link => {
    url.value = link
    isOpen.value = true
  })
})
</script>

<style scoped lang="scss">
  @keyframes close {
    0% {
      right: 0;
    }
    20% {
      right: .5%;
    }
    100% {
      right: -100%;
    }
  }
  @keyframes open {
    80% {
      right: .5%;
    }
    100% {
      right: 0;
    }
  }

  .Docviewer {
    top: 0;
    right: -100%;
    width: 80%;
    height: 100%;
    z-index: 999;
    display: grid;
    position: fixed;
    visibility: hidden;
    grid-template-columns: 1fr 20fr;
    &-isClose {
      animation-name: close;
      animation-duration: .25s;
      animation-fill-mode: forwards;
    }
    &-isOpen {
      visibility: visible;
      animation-name: open;
      animation-duration: .25s;
      animation-fill-mode: forwards;
    }
    &-section {
      &--boxshadow {
        box-shadow: 5px 0px 15px 0px rgb(225 225 225 / 25%);
        -moz-box-shadow: 5px 0px 15px 0px rgb(225 225 225 / 25%);
        -webkit-box-shadow: 5px 0px 15px 0px rgb(225 225 225 / 25%);
      }
    }
  }
</style>