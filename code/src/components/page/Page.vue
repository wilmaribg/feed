<script setup>
  import PageHeaderComponent from '@/components/page/PageHeader'  
</script>

<template>
  <div class="page--wrapper">
    <PageHeaderComponent class="page--wrapper-header"/>
    <div class="page--wrapper-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageComponent'
}
</script>

<style scoped lang="scss">
  $header-height: 8rem;
  
  .page--wrapper {
    height: 100vh;  
    display: flex;
    overflow: hidden;
    background-color: #000000;
    flex-direction: column;
    .page--wrapper-header {
      height: $header-height;
    }
    .page--wrapper-body {
      height: calc(100vh - ($header-height + 0rem));
      background: linear-gradient(0deg, rgba(85,207,250,0.10) 40%, rgba(255,86,55,0.10) 100%);
      // background: white;
    }
  }
</style>