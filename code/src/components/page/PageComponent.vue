<template>
  <div class="Page">
    <div class="Page-Header">
      <nav class="navbar is-black is-spaced" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="./#">
            <img src="@/assets/img/black-logo-mark.svg" alt="logo" width="135" height="45">
            <span class="Page-HeaderDivide"></span>
            <span class="is-size-3 has-text-weight-medium">Real-time Activity Feed</span>
          </a>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="columns">
                <div class="column is-narrow">
                  <div class="is-size-4 has-text-right">{{ name }}</div>
                  <div class="is-size-6 has-text-right has-text-grey">{{ company }}</div>
                </div>
                <div class="column is-narrow">
                  <AvatarComponent :photo="imageProfile" width="65px" height="65px"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="Page-body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script setup>
import { get } from 'lodash'
import { ref, onMounted } from 'vue'
import { UserMe } from '../../queries/index.js'
import AvatarComponent from '../AvatarComponent.vue'

const name = ref(null)
const company = ref(null)
const imageProfile = ref(null)

onMounted(async () => {
  try {
    const me = await UserMe()
    name.value = get(me, 'fullName')
    company.value = get(me, 'company.name')
    imageProfile.value = get(me, 'avatars.original')
  } catch(err) {
    console.error(err)
  }
})
</script>

<style scoped lang="scss">
  .Page {
    background-color: #000000;
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &-HeaderDivide {
      width: 3px;
      display: block;
      background: white;
      height: 80%;
      margin-right: 25px;
    }
    &-body {
      background: linear-gradient(0deg, rgba(85,207,250,0.10) 40%, rgba(255,86,55,0.10) 100%);
    }
  }
</style>