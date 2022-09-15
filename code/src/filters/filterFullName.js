import { get } from 'lodash'

export default (object, path) => {
  return get(object, `${path}.firstName`) + ' ' + get(object, `${path}.lastName`)
}