<script setup>
  import LiveEventsFeed from '@/components/liveEventsFeed/LiveEventsFeed.vue'
</script>

<template>
  <PageComponent>
    <template v-slot:body>
      <LiveEventsFeed />
    </template>
  </PageComponent>
</template>

<script>

export default {
  name: 'HomeView'
}
</script>
