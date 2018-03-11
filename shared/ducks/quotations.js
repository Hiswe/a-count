import crio from 'crio'

import { get, post } from '../iso-fetch'

const NAME = `quotations`

export const ERROR  = `@concompte/${NAME}/error`;
export const GET_ALL  = `@concompte/${NAME}/loaded`;
export const GET_ONE  = `@concompte/${NAME}/loaded-one`;
export const SAVE_ONE = `@concompte/${NAME}/saved-one`;

const initialState = {
  list:     [],
  current:  {},
}

export default function reducer(state = initialState, action) {
  if ( !crio.isCrio(state) ) state = crio( state )
  switch (action.type) {
    case GET_ALL:
      return state.set( `list`, action.payload.list )

    case GET_ONE:
      return state.set( `current`, action.payload )

    case SAVE_ONE:
      return state.set( `current`, action.payload )

    default:
      return state
  }
}

export const getAll = (params, cookie) => async dispatch => {
  const fetchOptions = {
    url: `${NAME}`,
  }
  const { payload } = await get( fetchOptions, cookie )
  const type = payload.error ? ERROR : GET_ALL
  dispatch( {type, payload} )
}

export const getOne = (params, cookie) => async dispatch => {
  let { id } = params
  id = id ? id : `new`
  const fetchOptions = {
    url: `${NAME}/${id}`,
  }
  const { payload } = await get( fetchOptions, cookie )
  // make an empty line at the bottom of the products list
  // this help the form when no-js
  // & also avoid to ta had this on componentWillReceiveProps
  if ( Array.isArray( payload.products ) ) {
    const copiedDefaultProduct = Object.assign( {}, payload.defaultProduct )
    payload.products.push( copiedDefaultProduct )
  }
  dispatch({
    type: GET_ONE,
    payload,
  })
}

export const saveOne = (params, cookie) => async dispatch => {
  const { body } = params
  let { id } = body
  id = id ? id : `new`
  const fetchOptions = {
    url: `${NAME}/${id}`,
    body,
  }
  const { payload } = await post( fetchOptions, cookie )
  if ( Array.isArray( payload.products ) ) {
    const copiedDefaultProduct = Object.assign( {}, payload.defaultProduct )
    payload.products.push( copiedDefaultProduct )
  }
  dispatch({
    type: SAVE_ONE,
    payload,
  })
}
