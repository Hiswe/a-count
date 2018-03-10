import { combineReducers } from 'redux'

import customers from './customers'
import quotations from './quotations'
import notifications from './notifications'
import auth from './auth'

const rootReducer = combineReducers({
  customers,
  quotations,
  notifications,
  auth,
})
export default rootReducer
