import { combineReducers } from 'redux'

import customers from './customers'
import quotations from './quotations'
import invoices from './invoices'
import notifications from './notifications'
import account, { LOGOUT, AUTH } from './account'
import formDraft from './form-draft'

const appReducer = combineReducers({
  customers,
  quotations,
  invoices,
  notifications,
  account,
  formDraft,
})

// make a global reducer
// • this will allow us to manipulate all the state for logout
//   https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992
const rootReducer = (state, action) => {
  if (action.type === LOGOUT.SUCCESS) state = void 0
  if (action.type === AUTH.ERROR) state = void 0
  return appReducer(state, action)
}

export default rootReducer
