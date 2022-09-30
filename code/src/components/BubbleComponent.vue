<template>
  <div 
    class="Bubble" 
    :class="{
      'Bubble--animate': animate
    }">
    <div 
      class="Bubble-wrapper" 
      :style="{ 
        'color': color,
        'background-color': background 
      }">
      <div class="Bubble-wrapperHeader">
        <div class="Bubble-headerUser">
          Juan Camilo Perez - JAN 22 at 2:30pm • 3 Interactions
        </div>
        <div class="Bubble-headerActions">
          ...
        </div>
      </div>
      <div class="Bubble-wrapperBody">
        <div class="Bubble-wrapperBodyImage">
          <img :src="iconApproved">
        </div>
        <div class="Bubble-wrapperBodyInfo">
          <div class="Bubble-bodyInfoTitle">
            Proposal: BMW Annual subscription
          </div>
          <div class="Bubble-wrapperBodyInfoSubtitle">
            Client: BMW - Total: $2.500 USD - Heat: COLD - Interest: 0 Pnts
          </div>
        </div>
      </div>
      <div class="Bubble-wrapperFooter">
        The proposals has been seen 5 minutos after has been created.
      </div>
    </div>  
  </div>
</template>

<script setup>
  import { defineProps } from 'vue'
  import iconApproved from '../assets/icons/icn-approved.svg'

  const props = defineProps({
    animate: Boolean,
    color: {
      type: String,
      default: '#ffffff'
    },
    background: {
      type: String,
      default: '#000000'
    },
  })
</script>

<style scoped lang="scss">
  $duration: 0.5;
  .aimation-content {
    bottom: 4px;
    opacity: 0;
    position: relative;
    animation-duration: #{$duration * 0.8}s;
    animation-fill-mode: forwards;
    animation-name: Bubble-wrapper-content;
  }
  @keyframes Bubble-wrapper {
    100% {
      left: 0;
    }
  }
  @keyframes Bubble-wrapper-content {
    100% {
      opacity: 1;
      bottom: 0;
    }
  }
  .Bubble {
    &--animate {
      position: relative;
      overflow: hidden;
      .Bubble-wrapper {
        width: 100%;
        left: -100%;
        position: relative;
        animation-name: Bubble-wrapper;
        animation-duration: #{$duration}s;
        animation-fill-mode: forwards;
        &Header {
          animation-delay: #{$duration}s;
          @extend .aimation-content;
        }
        &Body {
          animation-delay: #{$duration * 1.25}s;
          @extend .aimation-content;
        }
        &Footer {
          animation-delay: #{$duration * 1.5}s;
          @extend .aimation-content;
        }
      }
    }
    &-wrapper {
      display: grid;
      grid-template-rows: 0fr 0fr 0fr;
      grid-row-gap: 10px;
      border-radius: 5px;
      padding: var(--bubble-paddin);
    }
    &-wrapperHeader {
      color: var(--text-gray);
      font-weight: var(--font-medium);
      display: grid;
      grid-template-columns: 1fr 0fr;
    }
    &-wrapperBody {
      display: grid;
      grid-template-columns: 1fr 12fr;
      grid-column-gap: 10px;
    }
    &-wrapperBodyImage {
      max-width: 3em;
    }
    &-wrapperBodyInfo {
      display: grid;
      grid-template-rows: 1fr 1fr;
      align-items: center;
      grid-row-gap: 0px;
    }
    &-wrapperBodyInfoSubtitle {
      font-size: var(--text-medium);
      font-weight: var(--font-bold);
    }
    &-wrapperFooter {
      color: var(--text-gray);
    }
  }
</style>