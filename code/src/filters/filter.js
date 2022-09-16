import fullName from '@/filters/filterFullName.js'
import sortByDate from '@/filters/filterSortByDate.js'
import getEventsGroup from '@/filters/filterGetEventsGroup.js'
import objectKeysSortByDate from '@/filters/filterObjectKeysSortByDate.js'

export default {
  install(app) {    
    app.config.globalProperties.$filters = {
      fullName,
      sortByDate,
      getEventsGroup,
      objectKeysSortByDate
    }
  }
}