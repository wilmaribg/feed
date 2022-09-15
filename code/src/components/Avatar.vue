<template>
  <div class="avatar--container">
    <img :src="src" :style="{ width, height }" alt="avatar">
  </div>
</template>

<script>
import { get } from 'lodash'
import { useProfileStore } from '@/store/profile'

export default {
  name: 'AvatarComponent',
  props: {
    src: {
      type: String,
      default() {
        const profileStore = useProfileStore()
        return get(profileStore, 'profile.avatars.original')
      }
    },
    width: [Number, String],
    height: [Number, String],
  },
} 
</script>

<style scoped lang="scss">
  .avatar--container {
    display: inline-block;
    overflow: hidden;
    border-radius: 50%;
  }
</style>