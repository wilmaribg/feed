<template>
  <InifiniteScroll ref="inifiniteScroll">
    <template v-slot:body="slotProps">
      <LiveEventsFeedStack v-for="group in $filters.objectKeysSortByDate(groups, 'date')" 
        v-bind:key="group"
        :group="groups[group]" 
        @onMounted="slotProps.moveToBottom"
        :msController="slotProps.msController"
        :events="$filters.getEventsGroup(group, events)" />
    </template>
  </InifiniteScroll>
</template>

<script setup>
  import moment from 'moment'
  import { get } from 'lodash'
  import { ref, onMounted, inject } from 'vue'

  import { $emitter } from '@/plugins/pluginEmitter.js'
  import InifiniteScroll from '@/components/infiniteScroll/InfiniteScroll.vue'
  import LiveEventsFeedStack from '@/components/liveEventsFeed/LiveEventsFeedStack.vue'

  const groups = ref({})
  const events = ref([])
  
  const evenBusTimer = .5
  let evenBusLastTime = moment()

  const addGroup = event => {
    const groupKey = get(event, 'docId')
    if (!groups.value[groupKey]) {
      groups.value[groupKey] = {
        id: groupKey,
        avatar: get(event, 'data.user.photo'),
        date: event['updatedAt']
      }
    }
    if (!groups.value[groupKey].avatar) {
      groups.value[groupKey]['avatar'] = get(event, 'data.user.photo')
    }
    if (groups.value[groupKey].date.isBefore(event['updatedAt'])) {
      groups.value[groupKey]['date'] = event['updatedAt']
    }
  }

  const main = (sdk) => {
    sdk.api.events.find({ limit: 60, sort: 'updatedAt DESC' }, (err, docs) => {
      console.log('roge docs --->', docs)
      if (err) return console.error(err)
      for (let i = 0; i < docs.length; i++) {
        docs[i]['updatedAt'] = moment(get(docs[i], 'updatedAt')) 
        events.value.push(docs[i])
        addGroup(docs[i])
      }
    })
  }

  const listen = (event) => {
    const pushToList = (data, time) => {
      evenBusLastTime = time
      events.value.push(data)
      addGroup(data)
    }
    const pushEvent = (data) => {
      const { object, method, docId } = data
      if (!object || !method) return

      data['source'] = 'socket'
      data['updatedAt'] = moment(data['updatedAt']) 
    
      const timeDiff = evenBusLastTime.diff(data['updatedAt'], 'seconds')
      if (timeDiff >= evenBusTimer) return pushToList(data, data['updatedAt'])

      const interval = setInterval(() => {
        const timeDiff = evenBusLastTime.diff(data['updatedAt'], 'seconds')
        if (timeDiff <= evenBusTimer) return evenBusLastTime = moment()
        evenBusLastTime = data['updatedAt']
        pushToList(data, data['updatedAt'])
        clearInterval(interval)
      }, evenBusTimer * 100)
    }
    pushEvent(event)
  }

  onMounted(() => {
    const { sdk } = inject('integration')
    $emitter.on('onSocket', event => listen(event))
    setTimeout(() => {
      main(sdk)
    }, 500)
  })
</script>

<script>

export default {
  name: 'LiveEventsFeed'
}
</script>

<style scoped lang="scss">

</style>
