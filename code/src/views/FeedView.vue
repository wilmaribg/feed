<template>
  <PageComponent class="Feed" background="linear-gradient(0deg, rgba(85,207,250,0.10) 40%, rgba(255,86,55,0.10) 100%)">
    <template #body="{bodyHeight}">
      <!-- <div class="ml-6 pt-5 pb-5 Feed-body"> -->
      <div class="Feed-body ml-6">
        <div class="columns">
          <div class="column">
            <FeedComponent :height="bodyHeight" />
          </div>
        </div>
      </div>
    </template>
  </PageComponent>
</template>

<script setup>
import { onMounted } from 'vue'
import FeedComponent from '../components/FeedComponent.vue'

onMounted(() => {
  const audio = new Audio('https://s3.console.aws.amazon.com/s3/object/cdn.nodriza.io?region=us-east-1&prefix=live-feed/sounds/intro.mp3')
  audio.play()
})
</script>

<style scoped lang="scss">
.Feed {
  &-body {
    width: 100%;
  }
}
</style>