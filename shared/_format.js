import moment from 'moment'

export function setFakeId(businessForm, config) {
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
