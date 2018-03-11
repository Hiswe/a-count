import { combineReducers } from 'redux'

import customers from './customers'
import quotations from './quotations'
import notifications from './notifications'
import user from './user'

const rootReducer = combineReducers({
  customers,
  quotations,
  notifications,
  user,
})
export default rootReducer
