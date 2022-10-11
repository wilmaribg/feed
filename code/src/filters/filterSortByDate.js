import { inject } from 'vue'

export default (array, key, sort=-1) => {
  const get = inject('get')
  const moment = inject('moment')

  return array.sort((before, current) => {
    const afterDate = moment(get(before, key))
    const currentDate = moment(get(current, key))
    if (afterDate.isBefore(currentDate)) return -1 * sort
    return 1 * sort
  })
} 