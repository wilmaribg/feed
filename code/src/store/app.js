import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () =>({
    mute: false,
    zoom: 1
  }),
  getters: {

  },
  actions: {
    setMute(mute) {
      this.mute = mute
    },
    setZoom(value) {
      this.zoom = value
    }
  }
})