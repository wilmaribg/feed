<template>
  <!-- <pre>{{ animate }}</pre> -->
  <!-- :class="{
    'Bubble--animate': animate,
    'Bubble--animate-off': !animate
  }" -->
  <div 
    class="Bubble mr-6" 
  >
    <div 
      :id="id"
      class="Bubble-wrapper" 
      :style="{ 
        'color': color,
        'background': props.background,
        'z-index': event.data.lottie ? 1 : 0
      }">
      <div class="Bubble-wrapperHeader">
        <div class="columns Bubble-headerUser mb-0">
          <div class="column pb-0">
            {{ $filters.fullName(event, 'data.user') }} 
            - {{ moment(event.createdAt).format('MMM D H:mma') }}
          </div>
          <!-- <div class="column pb-0 has-text-right mr-6">
          </div> -->
          <div class="column is-narrow is-relative Bubble-headerActions">
            <template v-if="timeline">
              <span v-if="(event.data.interactions || interactions)" class="mx-2">
                <a 
                  href="javascript:void(0)" 
                  :class="{ 
                    'has-text-black': props.background != '#000000', 
                    'has-text-white': props.background == '#000000' 
                  }" 
                  @click="showInteractions"
                >
                  {{ interactions || event.data.interactions || 0 }} Interactions
                </a>
              </span>
            </template>
            <el-link 
              :icon="View" 
              @click="$emitter.emit('docViewer:open', linkView)"
              class="mx-2 is-size-5 Bubble-textActions"
              :class="{ 
                'has-text-white': /|#000000/gi.test(props.background), 
                'has-text-black': !/|#000000/gi.test(props.background), 
              }" 
            ></el-link>
            <Dropdown inline>
              <template #trigger>
                <el-button link>
                  <el-icon :size="20" class="Bubble-headerActionsMenu">
                    <MoreFilled />
                  </el-icon>
                </el-button>
              </template>
              <template #content>
                <div class="dropdown-content">
                  <a @click="open(linkEdit)" class="is-clickable has-text-black dropdown-item">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    &nbsp;Edit document
                  </a>
                  <ConfirmComponent
                    title="Delete event"
                    @onAcepted="deleteEvent"
                    message="Are you sure that you want to delete this event?"
                  >
                    <a class="is-clickable has-text-black dropdown-item">
                      <i class="fa fa-trash-o" aria-hidden="true"></i>
                      &nbsp;Delete event
                    </a>  
                  </ConfirmComponent>
                  <hr class="dropdown-divider">
                  <ConfirmComponent
                    title="Delete all related events"
                    @onAcepted="deleteEventSiblings"
                    message="Are you sure that you want to delete all these events?"
                  >
                    <a class="is-clickable has-text-black dropdown-item">
                      <i class="fa fa-trash has-text-danger" aria-hidden="true"></i>
                      <span class="has-text-danger">
                        &nbsp;Delete all related events
                      </span>
                    </a>
                  </ConfirmComponent>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>
      </div>
      <div class="Bubble-wrapperBody columns mb-0">
        <div class="column is-narrow is-relative">
          <div 
            class="lottie" 
            :id="'event-lottie-' + event._id" 
            :class="{'lottie--fullScreen': lottieFullScreen}">  
          </div>
          <img :id="'event-icon-' + event._id" class="Bubble-wrapperBodyImage" :src="icon || iconApproved">
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
import { ref, defineProps, inject, onMounted, computed, defineEmits } from 'vue'
import { Edit, View, ArrowDown, MoreFilled } from '@element-plus/icons-vue'
import { ElIcon, ElLink, ElButton } from 'element-plus'
import Timeline from './TimelineComponent.vue'
import Dropdown from './DropdownComponent.vue'
import ConfirmComponent from './ConfirmComponent.vue'
import { config as sdkConfig } from '../provides/sdk.js'
import iconApproved from '../assets/icons/icn-approved.svg'
import { EventsDelete, EventsSiblingsDelete } from '../queries/index.js'

const $emitter = inject('$emitter')
const moment = inject('moment')
const emit = defineEmits(['onComplete'])
const props = defineProps({
  event: Object,
  icon: String,
  animate: {
    type: Boolean,
    default: false
  },
  timeline: {
    type: Boolean,
    default: true
  },
  lottieFullScreen: {
    type: Boolean,
    default: false
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

const id = uuidv4()
const icon = ref(null)
const show = ref(false)
const bubbleEl = ref(null)
const interactions = ref(0)
const titleColor = ref(null)
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
  bubbleEl.value = document.getElementById(id)
  const image = props.icon
  const colors = props.color.split(',')
  
  if (image) icon.value = image
  if (colors && colors[0]) titleColor.value = colors[0]
  if (colors && colors[1]) descriptionColor.value = colors[1]

  setTimeout(() => emit('onComplete'), 1000)

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
    overflow-x: clip !important; 
    &:hover {
      .Bubble-textActions {
        display: inline-flex !important;
      }
    }
    .lottie {
      position: absolute;
      width: 200px;
      left: calc(-100px + 40px);
      &--fullScreen {
        top: 0!important;
        left: 0!important;
        width: 100%;
        height: auto;
        z-index: 99999;
        position: fixed;
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
      z-index: 1;
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
    &-headerActionsMenu {
      transform: rotate(90deg); 
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