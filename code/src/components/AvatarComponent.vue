<template>
  <div 
    class="Avatar" 
    :class="{ 'Avatar--animate': animate }"
    :style="{ width, height }">
    <div 
      class="AvatarImage"
      :style="{ 'background-image': `url(${props.photo || props.fallback})` }"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  photo: String,
  animate: Boolean,
  width: [Number, String],
  height: [Number, String],
  fallback: {
    type: String,
    default: () => ''
  },
})
</script>

<style scoped lang="scss">
  $animation_duration: .25;

  @keyframes Avatar-animate {
    0% {
      opacity: 0;
      background: #ffffff;
      border: 5px solid #ffffff;
    }
    80% {
      opacity: .5;
      background: #ffffff;
      border: 5px solid #ffffff;
    }
    100% {
      opacity: 1;
      background: #000000;
      border: 5px solid #000000;
    }
  }
  @keyframes AvatarImage-animate {
    0% {
      opacity: 0;
      transform: scale(.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .Avatar {
    overflow: hidden;
    border-radius: 50%;
    background: #ffffff;
    border: 5px solid #000000;
    &--animate {
      opacity: 0;
      animation-fill-mode: forwards;
      animation-name: Avatar-animate;
      animation-timing-function: ease-in;
      animation-duration: #{$animation_duration}s;
      .AvatarImage {
        opacity: 0;
        border-radius: 50%;
        animation-duration: .5s;
        animation-fill-mode: forwards;
        animation-name: AvatarImage-animate;
        animation-timing-function: ease-in;
        animation-delay: #{$animation_duration}s;
      }
    }
  }
  .AvatarImage {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>