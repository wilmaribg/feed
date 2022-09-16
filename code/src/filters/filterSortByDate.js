import { get } from 'lodash'

export default (array, key, sort=-1) => {
  return array.sort((before, current) => {
    if (get(before, key).isBefore(get(current, key))) {
      return -1 * sort
    } else {
      return 1 * sort
    }
  })
} 