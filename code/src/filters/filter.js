import fullName from '@/filters/filterFullName.js'
import sortByDate from '@/filters/filterSortByDate.js'

export default {
  install(app) {    
    app.config.globalProperties.$filters = {
      fullName,
      sortByDate,
    }
  }
}