<template>
  <div class="PageZoom columns is-vcentered">
    <slot name="prefix"></slot>
    <div class="column is-flex is-align-items-center">
      <button class="PageZoom-button button is-inverted" @click="setZoom(0.05)" :disabled="zoom>=1">
        <el-icon size="25px" color="var(--text-gray)">
          <CirclePlusFilled/>
        </el-icon>
      </button>
      <span class="has-text-black has-text-weight-semibold px-2">{{ zoomComp }}</span>
      <button class="PageZoom-button button is-inverted" @click="setZoom(-0.05)" :disabled="zoom<=0.60">
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

const zoom = ref(.75)
const zoomHandler = inject('zoom')
const $emitter = inject('$emitter')
const zoomComp = computed(() => Math.abs(zoom.value * 100).toFixed(0) + '%')

const setZoom = (value) => {
  zoom.value += value
  zoomHandler(zoom.value)
  $emitter.emit('onChangeZoom', zoom.value)
}

onMounted(() => {
  zoomHandler(zoom.value)
  setTimeout(() => {
    $emitter.emit('onChangeZoom', zoom.value)
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