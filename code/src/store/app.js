import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () =>({
    mute: false
  }),
  getters: {

  },
  actions: {
    setMute(mute) {
      this.mute = mute
    }
  }
})