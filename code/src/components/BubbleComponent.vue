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
        'background': backgroundColor,
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
                    'has-text-black': backgroundColor != '#000000', 
                    'has-text-white': backgroundColor == '#000000' 
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
                'has-text-white': /|#000000/gi.test(backgroundColor), 
                'has-text-black': !/|#000000/gi.test(backgroundColor), 
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
            :id="'event-lottie-' + event.id" 
            :class="{'lottie--fullScreen': isLottieFullScreen}">  
          </div>
          <img :id="'event-icon-' + event.id" class="Bubble-wrapperBodyImage" :src="icon || iconApproved">
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
  <!-- <pre>{{ event }}</pre> -->
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
const emit = defineEmits(['onComplete', 'onMounted'])
const props = defineProps({
  icon: String,
  event: Object,
  color: String,
  background: String,
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
})

const id = uuidv4()
const show = ref(false)
const bubbleEl = ref(null)
const interactions = ref(0)

const iconFile = computed(() => {
  return props.icon
})
const isLottieFullScreen = computed(() => {
  return props.lottieFullScreen
})
const backgroundColor = computed(() => {
  return props.background
})
const titleColor = computed(() => {
  const color = getColorTextColor()
  return color[0]
})
const descriptionColor = computed(() => {
  const color = getColorTextColor()
  return color[1] || color[0]
})
const linkView = computed(() => {
  return `https://${sdkConfig.hostname()}/v1/document/proposal/${props.event.docId}/full?source=none&rand=${new Date().getTime()}`
})
const linkEdit = computed(() => {
  return `https://${sdkConfig.hostname()}/app/documents/proposals/edit/${props.event.docId}`
})

const getColorTextColor = () => props.color.split(',')

const showInteractions = () => {
  show.value = !show.value
}

const open = link => window.open(link) 

const deleteEvent = async () => {
  try {
    const id = get(props.event, 'id', null) || get(props.event, '_id', null)
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

onMounted(async () => {
  bubbleEl.value = document.getElementById(id)
  const colors = await getColorTextColor()

  setTimeout(() => emit('onComplete'), 1000)
  setTimeout(() => emit('onMounted', props.event), 10)

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