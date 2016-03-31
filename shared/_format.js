import moment from 'moment'

import config from './config'

export function setFakeId(businessForm) {
  let type      = businessForm.type
  let {
    prefix,
    startingAt
  }             = config[type]
  let createdAt = moment(businessForm.time.created).format('YYMM')
  businessForm.id = `${prefix}${createdAt}-${startingAt + ~~businessForm.index[type]}`
  delete businessForm.index;
  return businessForm;
}
