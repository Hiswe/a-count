import crio from 'crio'
import isNil from 'lodash.isnil'

import createActionNames from './utils/create-action-names.js'
import fetchDispatch from './utils/fetch-dispatch.js'

const NAME = `invoices`
export const GET_ALL  = createActionNames( NAME, `get`, `all`)
export const GET_ONE  = createActionNames( NAME, `get`, `one` )
export const SAVE_ONE = createActionNames( NAME, `post`, `one` )

const initialState = crio({
  isSaving: false,
  list    : []   ,
  current:  {
    isLoading: true,
  },
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

    case SAVE_ONE.LOADING:
      return state.set( `isSaving`, true )
    case SAVE_ONE.DONE:
      return state.set( `isSaving`, false )
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
  const { id }  = params
  const options = {
    url: `${ NAME }/${ id }`,
  }
  await fetchDispatch({
    dispatch,
    actions: GET_ONE,
    fetch:    { options, cookie },
  })
}

export const saveOne = ({params, cookie}) => async dispatch => {
  const { body }  = params
  const { id }    = body
  const options   = {
    url: `${ NAME }/${ id }`,
    body,
  }
  await fetchDispatch({
    dispatch,
    actions:  SAVE_ONE,
    fetch:    { options, cookie },
  })
}
