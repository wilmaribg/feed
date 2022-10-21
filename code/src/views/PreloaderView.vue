<template>
  <div class="PreloaderView">
    <center>
      <div :id="id" class="PreloaderView-lottie mb-5"></div>
      <div class="mt-4 is-size-5 has-text-grey-light">
        To enhance your experience in this application,
      </div>
      <div class="is-size-5 has-text-grey-light">
        please turn on your speakers.
      </div>
      <div class="mt-5">
        <div class="columns is-justify-content-center">
          <div class="column p-0 is-narrow">
            <button 
              @click="router.push('/feed')" 
              class="button p-2 is-ghost has-text-grey-lighter is-size-4"
            >
              OK
            </button>
          </div>
          <div class="column p-0 is-narrow">
            <button 
              @click="accept=!accept" 
              class="button p-2 is-ghost has-text-grey-lighter is-size-4"
            >
              <box-icon v-if="accept" size="md" type='solid' name='volume-full' color="white"/>
              <box-icon v-else size="md" type='solid' name='volume-mute' color="white"/>
            </button>
          </div>
        </div>
      </div>
    </center>
<!--     <center>
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
    </center> -->
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
  document.body.style.zoom = 1 
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
    &-lottie :deep(svg) {
      width: auto !important;
      height: auto !important;
    }
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