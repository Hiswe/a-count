import crio from 'crio'

import createActionNames from './helpers/create-action-names.js'

import {
  GET_ONE as QUOTATION_GET_ONE,
  SAVE_ONE as QUOTATION_SAVE_ONE,
} from './quotations.js'
import {
  GET_ONE as CUSTOMER_GET_ONE,
  SAVE_ONE as CUSTOMER_SAVE_ONE,
} from './customers.js'

const NAME = `notifications`
export const REMOVE  = `@concompte/${NAME}/remove`
export const ALL_POST = createActionNames( `[_a-zA-Z0-9]+`, `post`, `[_a-zA-Z0-9]+` )


const initialState = crio( [] )


export default function reducer( state = initialState, action ) {
  const { type, payload } = action

  switch ( type ) {

    case REMOVE:
      const index = state.indexOf( payload )
      state = state.splice( index, 1 )
      return state

    case QUOTATION_SAVE_ONE.ERROR:
      return state.push({
        _id: new Date().valueOf(),
        message: `error during quotation save`,
      })

    case CUSTOMER_SAVE_ONE.ERROR:
      return state.push({
        _id: new Date().valueOf(),
        message: `error during customer save`,
      })

    case ALL_POST.ERROR:
      return state.push({
        _id: new Date().valueOf(),
        message: `something went wrong`,
      })

    default:
      return state
  }
}

export const removeOne = params => async dispatch => {
  dispatch({
    type:     REMOVE,
    payload:  params,
  })
}
