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

export default function reducer( state = initialState, action ) {
  const { type, payload, error } = action

  if ( postErrorRegexp.test( type ) ) {
    console.error( `error` )
    console.error( payload )
  }

  switch ( type ) {

    case REMOVE:
      const index = state.indexOf( payload )
      state = state.splice( index, 1 )
      return state

    // LOGIN – REGISTER
    case USER_REGISTER.SUCCESS:
    case USER_LOGIN.SUCCESS:
      return state.push({
        _id: shortid(),
        message: `welcome ${ payload.name || payload.email }`,
      })

    case QUOTATION_SAVE_ONE.SUCCESS:
    return state.push({
        _id: shortid(),
        message: `quotation saved`,
      })
    case QUOTATION_SAVE_ONE.ERROR:
      return state.push({
        _id: shortid(),
        error,
        message: `error during quotation save`,
      })

    case CUSTOMER_SAVE_ONE.SUCCESS:
    return state.push({
        _id: shortid(),
        message: `customer saved`,
      })
    case CUSTOMER_SAVE_ONE.ERROR:
      return state.push({
        _id: shortid(),
        error,
        message: payload.message,
      })

  }

  if ( postErrorRegexp.test( type ) ) {
    return state.push({
      _id: shortid(),
      error,
      message: payload.message,
    })
  }

  if ( postSuccessRegexp.test( type ) ) {
    return state.push({
      _id: shortid(),
      message: 'saved',
    })
  }

  return state
}

export const removeOne = params => async dispatch => {
  dispatch({
    type:     REMOVE,
    payload:  params,
  })
}
