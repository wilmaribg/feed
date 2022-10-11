<template>
  <div class="PreloaderView">
    <center>
      <div :id="id" class="lottie"></div>
    </center>
    <center>
      <div class="text--start is-clickable">
        <el-link @click="router.push('/feed')" type="info">
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
import { v4 as uuidv4 } from 'uuid'
import { ref, onMounted } from 'vue'
import { ElSwitch, ElIcon, ElLink } from 'element-plus'
import { loadAnimation } from 'lottie-web'
import { Promotion as IconPromotion } from '@element-plus/icons-vue'
import router from '../router/index.js'
import animationData from '../assets/lotties/logo-animation.json'

const id = uuidv4()
const accept = ref(false)

onMounted(() => {
  const animation = loadAnimation({
    container: document.getElementById(id),
    renderer: 'svg',
    autoplay: true,
    animationData,
    loop: false,
  })
})
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