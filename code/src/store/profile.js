import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () =>({
    profile: {}
  }),
  getters: {

  },
  actions: {
    setProfile(_profile) {
      this.profile = _profile
    }
  }
})