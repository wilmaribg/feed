<template>
  <InifiniteScroll>
    <template v-slot:title>
      <h3>Inifiite Scroll</h3>
    </template>
  </InifiniteScroll>
</template>

<script>
// @ is an alias to /src
import InifiniteScroll from '@/components/infiniteScroll/InfiniteScroll.vue'

export default {
  name: 'HomeView',
  components: {
    InifiniteScroll
  }
}
</script>
