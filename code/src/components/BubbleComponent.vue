<template>
  <div 
    class="Bubble mr-6" 
    :class="{
      'Bubble--animate': animate
    }">
    <div 
      :id="id"
      class="Bubble-wrapper" 
      :style="{ 
        'color': color,
        'background': bg || background,
        'z-index': event.data.lottie ? 1 : 0
      }">
      <div class="Bubble-wrapperHeader">
        <div class="columns Bubble-headerUser mb-0">
          <div class="column pb-0 is-narrow">
            {{ $filters.fullName(event, 'data.user') }} 
            - {{ moment(event.data.createdAt).format('MMM D H:mma') }}
            <template v-if="timeline">
              <span v-if="(event.data.interactions || interactions)">
                • <a href="javascript:void(0)" @click="showInteractions">
                  {{ interactions || event.data.interactions || 0 }} Interactions
                </a>
              </span>
            </template>
          </div>
          <div class="column pb-0 has-text-right mr-6">
            <el-link 
              :icon="View" 
              @click="$emitter.emit('docViewer:open', linkView)"
              class="mx-2 has-text-white is-hidden Bubble-textActions"
            >
              &nbsp;View
            </el-link>
          </div>
          <div class="column is-narrow Bubble-headerActions">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link mx-2">
                <box-icon name='dots-vertical-rounded' type='solid' color="white"/>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="open(linkEdit)">
                    <box-icon name='edit' type='solid'></box-icon>
                    &nbsp;Edit document
                  </el-dropdown-item>
                  <el-dropdown-item @click="deleteEvent" divided>
                    <box-icon name='trash' type='solid'></box-icon>
                    &nbsp;Delete event
                  </el-dropdown-item>
                  <el-dropdown-item @click="deleteEventSiblings" divided>
                    <box-icon name='trash-alt' type='solid' color="hsl(348, 100%, 61%)"></box-icon>
                    <span class="has-text-danger">
                      &nbsp;Delete all related events
                    </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="Bubble-wrapperBody columns mb-0">
        <div class="column is-narrow is-relative">
          <div 
            class="lottie" 
            :id="lottieContainer" 
            :class="{'lottie--fullScreen': lottieFullScreen}">  
          </div>
          <img :id="iconContainer" class="Bubble-wrapperBodyImage" :src="icon || iconApproved">
        </div>
        <div class="Bubble-wrapperBodyInfo column">
          <div class="Bubble-bodyInfoTitle" :style="{ color: titleColor }">
            <span 
              class="is-clickable Bubble-bodyInfoTitle--hover"
              @click="(event.data.interactions || interactions) ? showInteractions() : null"
            >
              {{ event.data.display }}
            </span>
          </div>
          <div class="Bubble-wrapperBodyInfoSubtitle" :style="{ color: descriptionColor }">
            {{ event.data.resume }}
          </div>
        </div>
      </div>
      <div class="Bubble-wrapperFooter">
        {{ event.data.observation }}
      </div>
    </div>  
  </div>
  <div v-if="timeline" class="ml-0 mt-5">
    <Timeline v-if="show" :docId="event.docId" :id="event.id" />
  </div>
</template>

<script setup>
import { get } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { loadAnimation } from 'lottie-web'
import { Edit, View } from '@element-plus/icons-vue'
import { ref, defineProps, inject, onMounted, computed } from 'vue'
import { ElIcon, ElLink, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import Timeline from './TimelineComponent.vue'
import { config as sdkConfig } from '../provides/sdk.js'
import iconApproved from '../assets/icons/icn-approved.svg'
import { EventsDelete, EventsSiblingsDelete } from '../queries/index.js'

const id = uuidv4()
const show = ref(false)
const interactions = ref(0)
const iconContainer = uuidv4()
const lottieContainer = uuidv4()
const $emitter = inject('$emitter')
const moment = inject('moment')
const props = defineProps({
  event: Object,
  animate: Boolean,
  timeline: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: '#ffffff'
  },
  background: {
    type: String,
    default: '#000000'
  },
})

const bg = ref(null)
const icon = ref(null)
const titleColor = ref(null)
const lottieFullScreen = ref(false)
const descriptionColor = ref(null)
const linkView = computed(() => {
  return `https://${sdkConfig.hostname()}/v1/document/proposal/${props.event.docId}/full?source=none&rand=${new Date().getTime()}`
})
const linkEdit = computed(() => {
  return `https://${sdkConfig.hostname()}/app/documents/proposals/edit/${props.event.docId}`
})

const showInteractions = () => {
  show.value = !show.value
  setTimeout(() => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
  }, 800)
}

const open = link => window.open(link) 

const recursiveSound = (tracks, index) => {
  if (!tracks[index]) return
  const audio = new Audio(tracks[index])
  audio.play()
  audio.addEventListener('ended', () => {
    let next = index + 1
    setTimeout(recursiveSound, 100, tracks, next)
  })
}

const deleteEvent = async () => {
  try {
    const id = get(props.event, 'id', null)
    await EventsDelete(id)
    $emitter.emit('bubble:deleteEvent', id)
  } catch (err) {
    console.error(err)
  }
}

const deleteEventSiblings = async () => {
  try {
    const docId = get(props.event, 'docId', null)
    await EventsSiblingsDelete(docId)
    $emitter.emit('bubble:deleteEventSiblings', docId)
  } catch (err) {
    console.error(err)
  }
}


onMounted(() => {
  const image = get(props.event, 'data.icon', '')
  const background = get(props.event, 'data.background', '')
  const colors = get(props.event, 'data.color', '').split(',')
  
  if (image) icon.value = image
  if (background) bg.value = background
  if (colors && colors[0]) titleColor.value = colors[0]
  if (colors && colors[1]) descriptionColor.value = colors[1]

  if (props.event.socket) {
    const lottie = get(props.event, 'data.lottie')
    const sound = get(props.event, 'data.sound', [])
    lottieFullScreen.value = get(props.event, 'data.lottieFullScreen', false)
    
    if (sound.length) recursiveSound(sound, 0)
    if (lottie) {
      setTimeout(() => {
        const elLottie = document.getElementById(lottieContainer)
        const animation = loadAnimation({
          container: elLottie,
          renderer: 'svg',
          autoplay: true,
          path: lottie,
          loop: false,
        })
        const position = document.getElementById(iconContainer).getBoundingClientRect()
        elLottie.style.top = `${position.top}px`
        elLottie.style.left = `calc(${position.left}px + 1.8em - 10em)`
        animation.onComplete = () => {
          elLottie.style.display = 'none'
          setTimeout(() => delete props.event.socket, 1000)
        } 
      }, 500)
    }
  }

  $emitter.on('feed:eventChangeInteractions', ({ docId, count }) => {
    if (props.event.docId == docId) interactions.value = count
  })
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
    &:hover {
      .Bubble-textActions {
        display: inline-flex !important;
      }
    }
    .lottie {
      width: 20em;
      position: fixed;
      &--fullScreen {
        top: 0 !important;
        left: 0 !important;
        width: 100vw;
        height: auto;
        z-index: 99999;
      }
    }
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
      a {
        color: rgba(225, 225, 225, 0.6);
        &:hover {
          color: #ffffff;
        }
      }
    }
    /*&-wrapperBody {
      display: grid;
      grid-template-columns: 1fr 12fr;
      grid-column-gap: 10px;
    }*/
    &-wrapperBodyImage {
      width: 3em; 
      height: auto;
    }
    &-headerActions {
      z-index: 1;
    }
    &-bodyInfoTitle {
      font-size: 1.3em;
      font-weight: 800;
    }
    &-bodyInfoTitle--hover {
      &:hover {
        opacity: 0.75;
      }
    }
    &-wrapperBodyInfo {
      display: grid;
      grid-template-rows: 1fr 1fr;
      align-items: center;
      grid-row-gap: 0px;
    }
    &-wrapperBodyInfoSubtitle {
      font-size: 1.2em;
      font-weight: 600;
    }
    &-wrapperFooter {
      color: var(--text-gray);
    }
  }
</style>