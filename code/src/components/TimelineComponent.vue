<template>
  <el-timeline class="Timeline">
    <el-timeline-item 
      v-for="(event, index) in $filters.sortByDate(events, 'createdAt', 1)" 
      :key="index"
      :timestamp="timestamp(event)"
      placement="top"
      size="large">
      <BubbleComponent :event="event" :animate="true" :timeline="false" />
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import prettyMilliseconds from 'pretty-ms'
import { ref, inject, defineProps, onMounted } from 'vue'
import { ElTimeline, ElTimelineItem, } from 'element-plus'
import { EventsSiblings } from '../queries/index.js'
import BubbleComponent from './BubbleComponent.vue'

const events = ref([])
const moment = inject('moment')
const props = defineProps({
  id: String,
  docId: String,
})

const timestamp = event => {
  const docCretatedAt = event.data ? event.data.docCretatedAt : null
  const diff = moment(event.createdAt).diff(docCretatedAt, 'miliseconds')
  return prettyMilliseconds(diff, { verbose: true, unitCount: 3 }) + ' after created'
}

onMounted(async () => {
  try {
    events.value = []
    const payload = { id: props.id, docId: props.docId }
    const docs = await EventsSiblings(payload)
    for (var i = 0; i < docs.length; i++) {
      events.value.push(docs[i]) 
    }
  } catch (err) {
    console.log(err)
  }
})
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
      font-size: 1.5em;
    }
  }
</style>