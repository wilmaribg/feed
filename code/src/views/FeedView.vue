<template>
  <PageComponent class="Feed">
    <template #body="{bodyHeight}">
      <div class="ml-6 pt-5 pb-5 Feed-body">
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
import FeedComponent from '../components/FeedComponent.vue'
</script>

<style scoped lang="scss">
.Feed {
  &-body {
    width: 100%;
  }
}
</style>