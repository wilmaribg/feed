<template>
  <el-timeline class="Timeline">
    <el-timeline-item :timestamp="moment().fromNow(true)" placement="top" size="large">
      <BubbleComponent :animate="true" />
    </el-timeline-item>
    <el-timeline-item :timestamp="moment().fromNow(true)" placement="top" size="large">
      <BubbleComponent :animate="true" />
    </el-timeline-item>
    <el-timeline-item :timestamp="moment().fromNow(true)" placement="top" size="large">
      <BubbleComponent :animate="true" />
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { inject } from 'vue'
import { ElTimeline, ElTimelineItem, } from 'element-plus'
import BubbleComponent from './BubbleComponent.vue'

const moment = inject('moment')
</script>

<style scoped lang="scss">
  .Timeline {
    :deep(.el-timeline-item::marker) { 
      content: '';
    }
    :deep(.el-timeline-item__content) {
      font-size: 14px;
    }
    :deep(.el-timeline-item__timestamp) {
      font-size: 1em;
    }
  }
</style>