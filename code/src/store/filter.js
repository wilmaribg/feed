import { get, isEmpty } from 'lodash'
import { defineStore } from 'pinia'
const filters = {
  wppGroupId: null,
  proposal: {
    greaterThan: {
      value: 0,
      label: 'Proposals with total price greater than:',
      associateMethod: 'all',
    },
    notifyNumber: {
      value: 0,
      label: 'Notify proposals until new number:',
      associateMethod: 'all',
    },
    create: {
      sound: false,
      label: 'Create Proposal',
      notificationWpp: false,
      notificationRaf: true,
      users: [],
    },
    update: {
      sound: false,
      label: 'Edit Proposal',
      notificationWpp: false,
      notificationRaf: true,
      users: [],
    },
    destroy: {
      sound: false,
      label: 'Delete Proposal',
      notificationWpp: false,
      notificationRaf: true,
      users: [],
    },
    opened: {
      sound: false,
      label: 'View Proposal',
      notificationWpp: false,
      notificationRaf: true,
      users: [],
    },
    draft: {
      sound: false,
      label: 'Proposal in Draft',
      notificationWpp: false,
      notificationRaf: true,
      associateMethod: 'changeStatus',
      users: [],
    },
    ready: {
      sound: false,
      label: 'Proposal is Ready',
      notificationWpp: false,
      notificationRaf: true,
      associateMethod: 'changeStatus',
      users: [],
    },
    approved: {
      sound: false,
      label: 'Proposal is Approved',
      notificationWpp: false,
      notificationRaf: true,
      associateMethod: 'changeStatus',
      users: [],
    },
    denied: {
      sound: false,
      label: 'Proposal is Denied',
      notificationWpp: false,
      notificationRaf: true,
      associateMethod: 'changeStatus',
      users: [],
    },
    warm: {
      sound: false,
      label: 'Proposal is Warm',
      notificationWpp: false,
      notificationRaf: true,
      associateMethod: 'onRating',
      users: [],
    },
    hot: {
      sound: false,
      label: 'Proposal is Hot',
      notificationWpp: false,
      notificationRaf: true,
      associateMethod: 'onRating',
      users: [],
    },
    setResponsible: {
      sound: false,
      label: 'New Responsible',
      notificationWpp: false,
      notificationRaf: true,
      users: [],
    },
    onUnpublishProposal: {
      sound: false,
      label: 'Unpublished View',
      notificationWpp: false,
      notificationRaf: true,
      users: [],
    },
  }
}

export const useFilterStore = defineStore('filter', {
  state: () =>({ filters }),
  getters: {},
  actions: {
    setFilters (data) {
      if (isEmpty(data)) return
      // console.log('roge data ---->', data)
      for (let key in data.proposal) {
        const associateMethod = this.filters.proposal[key]['associateMethod']
        if (!associateMethod) continue
        data.proposal[key]['associateMethod'] = associateMethod
      }
      if (data && data.proposal) data.proposal = Object.assign({}, filters.proposal, data.proposal)
      this.filters = data
    },
    reset () {
      this.filters.wppGroupId = null
      for (let key in this.filters.proposal) {
        if (this.filters.proposal[key].value) this.filters.proposal[key].value = 0
        if (this.filters.proposal[key].users) this.filters.proposal[key].users = []
        if (this.filters.proposal[key].sound) this.filters.proposal[key].sound = false
        if (this.filters.proposal[key].notificationWpp) this.filters.proposal[key].notificationWpp = false
        if (this.filters.proposal[key].notificationRaf) this.filters.proposal[key].notificationRaf = false
      }
    }
  }
})








