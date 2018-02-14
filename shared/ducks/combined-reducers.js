import { combineReducers } from 'redux'

import customers from './customers'
import quotations from './quotations'

const rootReducer = combineReducers({
  customers,
  quotations,
})
export default rootReducer
