<template>
  <div class="PageZoom columns is-vcentered">
    <slot name="prefix"></slot>
    <div class="column is-flex is-align-items-center">
      <button class="PageZoom-button button is-inverted" @click="setZoom(0.05)" :disabled="appStore.zoom>=1">
        <el-icon size="25px" color="var(--text-gray)">
          <CirclePlusFilled/>
        </el-icon>
      </button>
      <span class="has-text-black has-text-weight-semibold px-2">{{ zoomComp }}</span>
      <button class="PageZoom-button button is-inverted" @click="setZoom(-0.05)" :disabled="appStore.zoom<=0.60">
        <el-icon size="25px" color="var(--text-gray)">
          <RemoveFilled/>
        </el-icon>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ElIcon } from 'element-plus'
import { ref, computed, inject, onMounted } from 'vue'
import { CirclePlusFilled, RemoveFilled, Setting } from '@element-plus/icons-vue'
import { useAppStore } from '../../store/app.js'

const appStore = useAppStore()
const zoomHandler = inject('zoom')
const $emitter = inject('$emitter')
const zoomComp = computed(() => Math.abs(appStore.zoom * 100).toFixed(0) + '%')

const setZoom = (value) => {
  appStore.setZoom(appStore.zoom + value) 
  zoomHandler(appStore.zoom)
  $emitter.emit('onChangeZoom', appStore.zoom)
}

onMounted(() => {
  zoomHandler(appStore.zoom)
  setTimeout(() => {
    $emitter.emit('onChangeZoom', appStore.zoom)
  }, 500)
})
</script>

<style scoped lang="scss">
  .PageZoom {
    &-button {
      border: none;
      padding: .5rem;
      background: transparent;
    }
  }
  .noClick {
    cursor: not-allowed !important;
    pointer-events: none;
  }
</style>