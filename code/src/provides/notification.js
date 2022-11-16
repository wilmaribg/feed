import { notify } from "@kyvg/vue3-notification"

export default {
  success (title, text = null) {
    notify({ title, text, type: 'success' })
  },
  error (title, text = null) {
    notify({ title, text, type: 'error' })
  },
  warm (title, text = null) {
    notify({ title, text, type: 'warm' })
  },
  info (title, text = null) {
    notify({ title, text, type: 'info' })
  },
}