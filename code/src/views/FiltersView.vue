<template>
  <PageComponent background="#ffffff" class="FiltersView">
    <template #body="{ bodyHeight }">
      <div class="FiltersView-body" :style="{'min-height': bodyHeight+'px'}">
        <FiltersComponent @onClose="close" />
      </div>
    </template>
  </PageComponent>
</template>

<script setup>
import router from '../router/index.js'
import FiltersComponent from '../components/FiltersComponent.vue'

const close = () => {
  router.push({ name: 'preloaderView' })
}
</script>

<style lang="scss" scoped>
.FiltersView {
  &-body {
    width: 100%;
    overflow: auto;
    padding-bottom: 50px;
  }
}
</style>
