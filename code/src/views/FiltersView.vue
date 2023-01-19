<template>
  <PageComponent background="#ffffff" class="FiltersView">
    <template #body>
      <FiltersComponent @onClose="close" />
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

}
</style>
