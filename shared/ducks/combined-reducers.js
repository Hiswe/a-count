import { combineReducers } from 'redux'

import customers from './customers'
import quotations from './quotations'
import auth from './auth'

const rootReducer = combineReducers({
  customers,
  quotations,
  auth,
})
export default rootReducer
