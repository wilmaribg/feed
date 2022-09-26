<template>
  <nav class="navbar">
    <a class="navbar-brand" href="/">
      <img 
        src="@/assets/img/black-logo-mark.svg" 
        alt="logo" 
        class="d-inline-block align-text-top navbar-brand--logo">
      <span class="navbar-brand--pipe"></span>
      Real-time Activity Feed
    </a>
    <div class="d-flex">
      <!-- <div>
        <el-switch 
          v-model="mute" 
          @change="appStore.setMute(mute)"
          style="--el-switch-on-color: #ff4949; --el-switch-off-color: #13ce66"
          size="large"
          active-text="Mute" 
          inactive-text="Sound"/>
      </div> -->  
      <div class="navbar--profile">
        <span class="navbar--profile-company">{{company}}</span>
        <span class="navbar--profile-fullname">{{fullName}}</span>
      </div>
      <AvatarComponent width="65px" height="65px"/>
      <PageMenuComponent />
    </div>
  </nav>
</template>

<script setup>
  import { ref } from 'vue'
  import { get } from 'lodash'
  import { useProfileStore } from '@/store/profile'
  import PageMenuComponent from '@/components/page/PageMenu'

  const profileStore = useProfileStore()
  const fullName = ref(get(profileStore, 'profile.fullName'))
  const company = ref(get(profileStore, 'profile.company.name'))
</script>

<style scoped lang="scss">
  .navbar {
    color: white;
    padding: 1.75rem;
    font-weight: 400;
    .navbar-brand {
      cursor: pointer;
      color: white;
      font-size: 2rem;
      display: inline-flex;
      align-items: center;
      .navbar-brand--pipe {
        margin: 0 1.5rem;
        width: 2px;
        background: white;
        display: inline-flex;
        height: 2rem;
      }
      .navbar-brand--logo {
        width: 5rem;
        height: 2rem; 
      }
    }
    .navbar--profile {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-end;
      line-height: normal;
      margin-right: 30px;
      text-align: right;
      .navbar--profile-company {
        display: inline-flex;
        font-size: 1.8rem;
      }
      .navbar--profile-fullname {
        display: inline-flex;
        font-size: 1.2rem;
        color: #808080;
      }
    }
  }
</style>