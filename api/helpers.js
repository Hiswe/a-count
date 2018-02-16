import config from  './config'

export const formatResponse = (payload = {}) => ({
  version:  config.VERSION,
  name:     config.NAME,
  payload,
})
