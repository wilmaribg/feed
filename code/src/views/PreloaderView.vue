<template>
  <div class="PreloaderView">
    <center>
      <LottiesPreload />
    </center>
    <center>
      <div class="text--start">
        <el-link @click="router.push('/live-activity-feed')" type="info">
          Start 
          <el-icon class="el-icon--right" color="#808080">
            <IconPromotion />
          </el-icon>
        </el-link>
      </div>
      <span class="text--enable-media">
        Do you want enable sounds and animations?
      </span>
      <el-switch
        v-model="accept"
        size="small"
        style="--el-link-font-size: 20px;"
        active-text="Yes"
        inactive-text="No"
        class=""/>
    </center>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import router from '@/router/index.js'
  import LottiesPreload from '@/components/lotties/LottiesPreload.vue'
  
  const accept = ref(true)
</script>

<style scoped lang="scss">
  .PreloaderView {
    background-color: black;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .text--enable-media {
    color: #808080;
    display: block;
    font-size: 12px;
    margin-top: 30px;
    font-weight: 500;
  }
  .text--start {
    color: white;
    margin-top: 16px;
  }
  ::v-deep .el-link__inner {
    font-size: 24px; 
    font-weight: 500;
  }
</style>