import crio from 'crio'

import * as isoFetch from '../iso-fetch'

const NAME = `customers`
export const ERROR    = `@concompte/${NAME}/error`;
export const GET_ALL  = `@concompte/${NAME}/loaded`;
export const GET_ONE  = `@concompte/${NAME}/loaded-one`;
export const SAVE_ONE = `@concompte/${NAME}/saved-one`;

const initialState = {
  list:     [],
  current:  {},
}

export default function reducer(state = initialState, action) {
  if (!crio.isCrio(state)) state = crio( state )
  switch (action.type) {
    case GET_ALL:
      return state.set( `list`, action.payload.list )

    case GET_ONE:
      return state.set( `current`, action.payload)

    case SAVE_ONE:
      return state.set( `current`, action.payload)

    default:
      return state
  }
}

export const getAll = (params, cookie) => async dispatch => {
  const fetchOptions = {
    url: `${NAME}`,
  }
  const { payload } = await isoFetch.get( fetchOptions, cookie )
  const type = payload.error ? ERROR : GET_ALL
  dispatch( {type, payload} )
}

export const getOne = (params, cookie) => async dispatch => {
  let { id } = params
  id = id ? id : `new`
  const fetchOptions = {
    url: `${NAME}/${id}`,
  }
  const { payload } = await isoFetch.get( fetchOptions, cookie )
  const type = payload.error ? ERROR : GET_ONE
  dispatch( {type, payload} )
}

export const saveOne = (params, cookie) => async dispatch => {
  const { body } = params
  let { id } = body
  id = id ? id : `new`
  const fetchOptions = {
    url: `${NAME}/${id}`,
    body,
  }
  const { payload } = await isoFetch.post( fetchOptions, cookie )
  const type = payload.error ? ERROR : SAVE_ONE
  dispatch( {type, payload} )
}
