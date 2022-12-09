<template>
  <div class="Page">
    <div class="Page-Header">
      <nav class="navbar is-black is-spaced" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="./#">
            <img src="@/assets/img/black-logo-mark.svg" alt="logo" width="135" height="45">
            <span class="Page-HeaderDivide"></span>
            <span class="is-size-3 has-text-weight-medium">Real-time Activity Feed</span>
          </a>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="columns is-vcentered">
                <div class="column is-narrow">
                  <div class="is-size-4 has-text-right">{{ name }}</div>
                  <div class="is-size-6 has-text-right has-text-grey">{{ company }}</div>
                </div>
                <div class="column is-narrow">
                  <AvatarComponent :photo="imageProfile" width="65px" height="65px"/>
                </div>
                <div class="column is-narrow">
                  <Dropdown class="Page-dropdown">
                    <template #trigger>
                      <el-button link>
                        <el-icon :size="20" class="Page-dropdownIcon">
                          <MoreFilled />
                        </el-icon>
                      </el-button>
                    </template>
                    <template #content>
                      <div class="dropdown-content">
                        <div class="has-text-right">
                          <a 
                            @click="filtersModal=true"
                            class="pr-4 py-3 is-clickable has-text-black dropdown-item is-size-6 has-text-weight-bold"
                          >
                            FILTERS
                            &nbsp;<i class="fa fa-filter" aria-hidden="true"></i>
                          </a>
                          <a class="pr-4 py-3 is-clickable has-text-black dropdown-item is-size-6 has-text-weight-bold">
                            LOGOUT
                            &nbsp;<i class="fa fa-sign-out" aria-hidden="true"></i>
                          </a>
                        </div>
                        <hr class="dropdown-divider">
                        <div class="ml-5 pr-4">
                          <PageZoomComponent>
                            <template #prefix>
                              <div class="column">
                                <span class="is-size-6 has-text-black has-text-weight-bold">
                                  ZOOM
                                </span>
                              </div>
                            </template>
                          </PageZoomComponent>
                        </div>
                      </div>
                    </template>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div 
      class="Page-body" 
      :class="{ 
        'container': container, 
        'is-max-desktop': desktop, 
        'Page-body--padding': padding, 
      }"
    >
      <slot name="body" :bodyHeight="bodyHeight"></slot>
      <el-dialog v-model="filtersModal" fullscreen show-close>
        <FiltersComponent @onClose="filtersModal=false" />
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { get } from 'lodash'
import { ref, onMounted, inject, defineProps } from 'vue'
import { Edit, View, ArrowDown, MoreFilled } from '@element-plus/icons-vue'
import { ElIcon, ElButton, ElDialog } from 'element-plus'
import { useAppStore } from '../../store/app.js'
import Dropdown from '../DropdownComponent.vue'
import { UserMe } from '../../queries/index.js'
import AvatarComponent from '../AvatarComponent.vue'
import FiltersComponent from '../FiltersComponent.vue'
import PageZoomComponent from '../page/PageZoomComponent.vue'

const zoomHandler = inject('zoom')
const $emitter = inject('$emitter')
const appStore = useAppStore()

const props = defineProps({
  padding: {
    type: Boolean,
    default: false
  },
  container: {
    type: Boolean,
    default: false
  },
  desktop: {
    type: Boolean,
    default: false
  } 
})

const name = ref(null)
const company = ref(null)
const bodyHeight = ref(0) 
const imageProfile = ref(null)
const filtersModal = ref(false)

const setbodyHeight = () => {
  bodyHeight.value = document.querySelector('.Page-body').clientHeight
}

onMounted(async () => {
  try {
    setbodyHeight()
    zoomHandler(appStore.zoom)
    const me = await UserMe()
    name.value = get(me, 'fullName')
    company.value = get(me, 'company.name')
    imageProfile.value = get(me, 'avatars.original')
    $emitter.on('onChangeZoom', value => setbodyHeight())
  } catch(err) {
    console.error(err)
  }
})
</script>

<style scoped lang="scss">
  .Page {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #000000;
    &-dropdownIcon {
      transform: rotate(90deg);
    }
    &-Header {
      max-height: 115px;
    }
    &-HeaderDivide {
      width: 3px;
      display: block;
      background: white;
      height: 80%;
      margin-right: 25px;
    }
    &-body {
      display: flex;
      position: relative;
      height: calc(100% - 115px);
      background: linear-gradient(0deg, rgba(85,207,250,0.10) 40%, rgba(255,86,55,0.10) 100%);
      &--padding {
        padding: 16px;
        padding: 38px;
      }
    }
  }
</style>