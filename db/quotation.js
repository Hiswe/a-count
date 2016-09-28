import  {
  view,
  atomic
}  from './index'
import * as businessForm  from './business-form'
import  config            from '../shared/config'

function getAllActive() {
  return view('quotation', 'byTime', {descending: true})
}

function getNextIndex() {
  return businessForm.getNextIndex('quotation')
}

function getByFakeId(fakeId) {
  BusinessForm.getByFakeId(fakeId, 'quotation')
}

export {
  getAllActive,
  getNextIndex,
  getByFakeId,
};
