import { get } from 'lodash'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
  state: () =>({
    profile: {}
  }),
  getters: {
    userId() {
      return get(this.profile, 'profile.id')
    }
  },
  actions: {
    setProfile(_profile) {
      this.profile = _profile
    }
  }
})