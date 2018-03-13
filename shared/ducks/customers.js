import crio from 'crio'

import * as isoFetch from '../iso-fetch.js'
import fetchDispatch from './_fetch-dispatch.js'

const NAME = `customers`
export const GET_ALL  = `@concompte/${NAME}/get-all`;
export const GET_ONE  = `@concompte/${NAME}/get-one`;
export const SAVE_ONE = `@concompte/${NAME}/update-one`;

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

export const getAll = ({params, cookie}) => async dispatch => {
  const fetchOptions = {
    url: `${NAME}`,
  }
  const { payload } = await isoFetch.get( fetchOptions, cookie )
  await fetchDispatch({
    dispatch,
    type:     GET_ALL,
    request:  isoFetch.get( fetchOptions, cookie ),
  })
}

export const getOne = ({params, cookie}) => async dispatch => {
  let { id } = params
  id = id ? id : `new`
  const fetchOptions = {
    url: `${NAME}/${id}`,
  }
  await fetchDispatch({
    dispatch,
    type:     GET_ONE,
    request:  isoFetch.get( fetchOptions, cookie ),
  })
}

export const saveOne = ({params, cookie}) => async dispatch => {
  const { body } = params
  let { id } = body
  id = id ? id : `new`
  const fetchOptions = {
    url: `${NAME}/${id}`,
    body,
  }
  await fetchDispatch({
    dispatch,
    type:     SAVE_ONE,
    request:  isoFetch.post( fetchOptions, cookie ),
  })
}
