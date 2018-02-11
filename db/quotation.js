import  {
  view,
  atomic
}  from './index'
// import * as businessForm  from './business-form'
import  config            from '../shared/config'

function getAllActive() {
  return Promise.resolve([])
  // return view('quotation', 'byTime', {descending: true})
}

function getNextIndex() {
  return 666
  // return businessForm.getNextIndex('quotation')
}

function getByFakeId(fakeId) {
  return Promise.resolve({})
  // BusinessForm.getByFakeId(fakeId, 'quotation')
}

export {
  getAllActive,
  getNextIndex,
  getByFakeId,
};
