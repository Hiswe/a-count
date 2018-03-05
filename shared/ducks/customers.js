import crio from 'crio'

import {fetchGet, fetchPost} from './helpers'

const NAME = `customers`

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
      return state.set( `list`, action.payload)

    case GET_ONE:
      return state.set( `current`, action.payload)

    case SAVE_ONE:
      return state.set( `current`, action.payload)

    default:
      return state
  }
}

export const getAll = () => dispatch => {
  return fetchGet(NAME)
    .then(payload => {
      dispatch({
        type: GET_ALL,
        payload,
      })
    })
}

export const getOne = ({id}) => dispatch => {
  id = id ? id : `new`
  return fetchGet(`${NAME}/${id}`)
    .then(payload => {
      dispatch({
        type: GET_ONE,
        payload,
      })
    })
}

export const saveOne = (body) => dispatch => {
  let {id} = body
  id = id ? id : `new`
  return fetchPost(`${NAME}/${id}`, body)
    .then(payload => {
      dispatch({
        type: SAVE_ONE,
        payload,
      })
    })
}