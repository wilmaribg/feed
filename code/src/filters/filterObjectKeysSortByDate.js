import { get } from 'lodash'

export default (object, key) => {
  return Object.keys(object).sort((before, current) => {
    if (get(object[before], key).isBefore(get(object[current], key))) {
      return -1
    } else {
      return 0
    }
  })
}