<template>
  <PageComponent>
    <template v-slot:body>
      <div class="container pt-5 pb-5">
        <FeedComponent />
      </div>
    </template>
  </PageComponent>
</template>

<script setup>
import FeedComponent from '../components/FeedComponent.vue'
</script>

<style scoped lang="scss">
  // .container {
  //   overflow: hidden; 
  //   height: 100vh; 
  //   padding: 50px 0 100px 0; 
  // }
</style>