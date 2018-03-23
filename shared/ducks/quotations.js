import crio from 'crio'

import createActionNames from './helpers/create-action-names.js'
import fetchDispatch from './helpers/fetch-dispatch.js'

const NAME = `quotations`
export const GET_ALL  = createActionNames( NAME, `get`, `all`)
export const GET_ONE  = createActionNames( NAME, `get`, `one` )
export const SAVE_ONE = createActionNames( NAME, `post`, `one` )

const initialState = crio({
  list:     [],
  current:  {},
})

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch ( type ) {

    case GET_ALL.SUCCESS:
      return state.set( `list`, payload.list )

    case GET_ONE.LOADING:
      return state.set( `current`, {
        isLoading: true,
        reference: `loading…`,
        products: [],
      })

    case GET_ONE.SUCCESS:
      return state.set( `current`, payload )

    case SAVE_ONE.SUCCESS:
      return state.set( `current`, payload )

    default:
      return state
  }
}

export const getAll = ({params, cookie}) => async dispatch => {
  const options = {
    url: `${NAME}`,
  }
  await fetchDispatch({
    dispatch,
    actions:   GET_ALL,
    fetch:    { options, cookie },
  })
}

export const getOne = ({params, cookie}) => async dispatch => {
  let { id } = params
  id = id ? id : `new`
  const options = {
    url: `${NAME}/${id}`,
  }
  await fetchDispatch({
    dispatch,
    actions: GET_ONE,
    fetch:    { options, cookie },
  })
}

export const saveOne = ({params, cookie}) => async dispatch => {
  const { body } = params
  let { id } = body
  id = id ? id : `new`
  const options = {
    url: `${NAME}/${id}`,
    body,
  }
  await fetchDispatch({
    dispatch,
    actions:  SAVE_ONE,
    fetch:    { options, cookie },
  })
}
