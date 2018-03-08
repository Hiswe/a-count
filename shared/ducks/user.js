import crio from 'crio'

import { get, post } from '../iso-fetch'

const NAME = `users`
export const ERROR  = `@concompte/${NAME}/error`;
export const GET_ONE  = `@concompte/${NAME}/loaded-one`;
export const SAVE_ONE = `@concompte/${NAME}/saved-one`;

const initialState = {}

export default function reducer(state = initialState, action) {
  if (!crio.isCrio(state)) state = crio( state )
  switch (action.type) {
    // case GET_ALL:
    //   return state.set( `list`, action.payload)

    // case GET_ONE:
    //   return state.set( `current`, action.payload)

    // case SAVE_ONE:
    //   return state.set( `current`, action.payload)

    default:
      return state
  }
}

export const getOne = (params, cookie) => async dispatch => {
  let { id } = params
  id = id ? id : `new`
  const fetchOptions = {
    url: `${NAME}/${id}`,
  }
  try {
    const { payload } = await get( fetchOptions, cookie )
    dispatch({
      type: GET_ONE,
      payload,
    })
  } catch(e) {
    dispatch({
      type: ERROR,
      payload: e,
    })
  }
}
