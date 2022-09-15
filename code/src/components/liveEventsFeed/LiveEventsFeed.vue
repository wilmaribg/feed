<script setup>
  import moment from 'moment'
  import { get } from 'lodash'
  import { ref, onMounted, inject } from 'vue'

  import InifiniteScroll from '@/components/infiniteScroll/InfiniteScroll.vue'
  import LiveEventsFeedGroup from '@/components/liveEventsFeed/LiveEventsFeedGroup.vue'

  const groups = ref({})
  const events = ref([])
  
  onMounted(() => {
    const { sdk, socket } = inject('integration')
    sdk.api.events.find({ limit: 100, sort: 'updatedAt DESC' }, (err, docs) => {
      console.log('roge docs --->', docs)
      for (let i = 0; i < docs.length; i++) {
        const date = moment(get(docs[i], 'updatedAt'))
        const groupKey = get(docs[i], 'docId')

        if (!groups.value[groupKey]) {
          groups.value[groupKey] = {
            id: groupKey,
            avatar: get(docs[i], 'data.user.photo'),
            date: moment(date)
          }
        }
        if (!groups.value[groupKey].avatar) {
          groups.value[groupKey]['avatar'] = get(docs[i], 'data.user.photo')
        }
        if (!groups.value[groupKey].date.isBefore(date)) {
          groups.value[groupKey]['date'] = date
        }

        docs[i]['updatedAt'] = date 
        events.value.push(docs[i])
      }
    })
  })
</script>

<template>
  <InifiniteScroll @onButtom="onScroll">
    <template v-slot:body>
      <LiveEventsFeedGroup v-for="group in $filters.objectKeysSortByDate(groups, 'date')" 
        v-bind:key="group" 
        :group="groups[group]" 
        :events="events" />
    </template>
  </InifiniteScroll>
</template>

<script>

export default {
  name: 'LiveEventsFeed'
}
</script>

<style scoped lang="scss">

</style>
