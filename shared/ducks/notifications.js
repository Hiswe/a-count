import crio from 'crio'
import shortid from 'shortid'

import createActionNames from './utils/create-action-names.js'

import {
  GET_ONE  as QUOTATION_GET_ONE,
  SAVE_ONE as QUOTATION_SAVE_ONE,
} from './quotations.js'
import {
  GET_ONE  as INVOICE_GET_ONE,
  SAVE_ONE as INVOICE_SAVE_ONE,
} from './invoices.js'
import {
  GET_ONE  as CUSTOMER_GET_ONE,
  SAVE_ONE as CUSTOMER_SAVE_ONE,
} from './customers.js'
import {
  AUTH     as USER_AUTH,
  LOGIN    as USER_LOGIN,
  FORGOT   as USER_FORGOT,
  RESET    as USER_RESET,
  LOGOUT   as USER_LOGOUT,
  REGISTER as USER_REGISTER,
  SAVE_ONE as USER_SAVE_ONE,
} from './users.js'

const NAME = `notifications`
export const REMOVE     = `@concompte/${NAME}/remove`
export const ALL_POST   = createActionNames( `[_a-zA-Z0-9]+`, `post`, `[_a-zA-Z0-9]+` )
const postSuccessRegexp = new RegExp( `^${ ALL_POST.SUCCESS }$` )
const postErrorRegexp   = new RegExp( `^${ ALL_POST.ERROR }$` )

const initialState = crio( [] )

function notifySuccess( state, i18nId, values = {} ) {
  return state.push({
    _id: shortid(),
    i18nId,
    ...values
  })
}

function notifyError( state, i18nId, values = {} ) {
  return state.push({
    _id: shortid(),
    error: true,
    i18nId,
    ...values
  })
}

export default function reducer( state = initialState, action ) {
  const { type, payload, error } = action

  if ( postErrorRegexp.test( type ) ) {
    console.error( `error` )
    console.error( payload )
  }

  switch ( type ) {
    case REMOVE: {
      const index = state.indexOf( payload )
      return state.splice( index, 1 )
    }
    //----- USER
    case USER_REGISTER.SUCCESS:
    case USER_LOGIN.SUCCESS:
    case USER_RESET.SUCCESS: {
      const { user } = payload
      const name = user.name || user.email
      return notifySuccess( state, `notifications.user.welcome`, { name } )
    }
    case USER_FORGOT.SUCCESS: {
      const { email } = payload
      return notifySuccess( state, `notifications.user.mail-sent`, { email } )
    }
    //----- QUOTATIONS
    case QUOTATION_SAVE_ONE.SUCCESS: {
      return notifySuccess( state, `notifications.quotation.saved` )
    }
    case QUOTATION_SAVE_ONE.ERROR: {
      return notifyError( state, `notifications.quotation.error` )
    }
    //----- INVOICES
    case INVOICE_SAVE_ONE.SUCCESS: {
      return notifySuccess( state, `notifications.invoice.saved` )
    }
    case INVOICE_SAVE_ONE.ERROR: {
      return notifyError( state, `notifications.invoice.error` )
    }
    //----- CUSTOMERS
    case CUSTOMER_SAVE_ONE.SUCCESS: {
      return notifySuccess( state, `notifications.customer.saved` )
    }
    case CUSTOMER_SAVE_ONE.ERROR: {
      return notifyError( state, `notifications.customer.error`, {
        additionalContent: payload.message,
      })
    }
  }
  //----- CATCH ALL
  // • if no custom notification has been handled, make a general one
  if ( postErrorRegexp.test( type ) ) {
    return notifyError( state, 'notifications.generic.error', {
      additionalContent: payload.message,
    } )
  }
  if ( postSuccessRegexp.test( type ) ) {
    return notifySuccess( state, 'notifications.generic.saved' )
  }

  return state
}

export const removeOne = params => async dispatch => {
  dispatch({
    type:     REMOVE,
    payload:  params,
  })
}
