import crio from 'crio'
import shortid from 'shortid'

import createActionNames from './helpers/create-action-names.js'

import {
  GET_ONE as QUOTATION_GET_ONE,
  SAVE_ONE as QUOTATION_SAVE_ONE,
} from './quotations.js'
import {
  GET_ONE as CUSTOMER_GET_ONE,
  SAVE_ONE as CUSTOMER_SAVE_ONE,
} from './customers.js'
import {
  AUTH as USER_AUTH,
  LOGIN as USER_LOGIN,
  FORGOT as USER_FORGOT,
  RESET as USER_RESET,
  LOGOUT as USER_LOGOUT,
  REGISTER as USER_REGISTER,
  SAVE_ONE as USER_SAVE_ONE,
} from './users.js'

const NAME = `notifications`
export const REMOVE  = `@concompte/${NAME}/remove`
export const ALL_POST = createActionNames( `[_a-zA-Z0-9]+`, `post`, `[_a-zA-Z0-9]+` )
const postSuccessRegexp = new RegExp( `^${ ALL_POST.SUCCESS }$` )
const postErrorRegexp = new RegExp( `^${ ALL_POST.ERROR }$` )

const initialState = crio( [] )

function notifySuccess( state, message ) {
  return state.push({
    _id: shortid(),
    message,
  })
}

function notifyError( state, message ) {
  return state.push({
    _id: shortid(),
    error: true,
    message,
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
      const message = `welcome ${ payload.user.name || payload.user.email }`
      return notifySuccess( state, message )
    }
    case USER_FORGOT.SUCCESS: {
      const message = `an email as been send to ${ payload.email }`
      return notifySuccess( state, message )
    }
    //----- QUOTATIONS
    case QUOTATION_SAVE_ONE.SUCCESS: {
      const message = `quotation saved`
      return notifySuccess( state, message )
    }
    case QUOTATION_SAVE_ONE.ERROR: {
      const message = `error while saving quotation`
      return notifyError( state, message )
    }
    //----- CUSTOMERS
    case CUSTOMER_SAVE_ONE.SUCCESS: {
      const message = `customer saved`
      return notifySuccess( state, message )
    }
    case CUSTOMER_SAVE_ONE.ERROR: {
      const message = payload.message
      return notifyError( state, message )
    }
  }
  //----- CATCH ALL
  // • if no custom notification has been handled, make a general one
  if ( postErrorRegexp.test( type ) ) {
    return notifyError( state, payload.message )
  }
  if ( postSuccessRegexp.test( type ) ) {
    return notifySuccess( state, 'saved', )
  }

  return state
}

export const removeOne = params => async dispatch => {
  dispatch({
    type:     REMOVE,
    payload:  params,
  })
}
