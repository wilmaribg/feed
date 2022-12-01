import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () =>({
    mute: false,
    zoom: 0.75
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