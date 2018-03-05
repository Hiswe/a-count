import merge from 'lodash.merge'

import config from  './config'

export const formatResponse = (payload = {}) => {
  return merge({
    _version:  config.VERSION,
    _name:     config.NAME,
  }, payload)
}
