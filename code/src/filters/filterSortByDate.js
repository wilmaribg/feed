import { get } from 'lodash'

export default (array, key) => {
  return array.sort((before, current) => {
    if (get(before, key).isBefore(get(current, key))) {
      return -1
    } else {
      return 0
    }
  })
} 