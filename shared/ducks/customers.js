import crio from 'crio'
import isNil from 'lodash.isnil'

import createActionNames from './utils/create-action-names.js'
import fetchDispatch from './utils/fetch-dispatch.js'

const NAME = `customers`
export const GET_ALL  = createActionNames( NAME, `get`, `all`)
export const GET_ONE  = createActionNames( NAME, `get`, `one` )
export const SAVE_ONE = createActionNames( NAME, `post`, `one` )

const initialState = crio({
  isSaving: false,
  all:      [],
  meta: {
    all: {},
  },
  current:  {},
})

export default function reducer(state = initialState, action) {
  const { type, payload, meta } = action

  switch (type) {
    case GET_ALL.SUCCESS:
      state = state.set( `active`, payload.rows )
      return  state.set( `meta.active`, payload.meta )

    case GET_ONE.LOADING:
      return state.set( `current`, {
        isLoading: true      ,
        name     : `loading…`,
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

export const getAll = (params, cookie) => async dispatch => {
  const options = {
    url: `${NAME}`,
  }
  return await fetchDispatch({
    dispatch,
    actions:  GET_ALL,
    fetch:    { options, cookie },
  })
}

export const getOne = (params, cookie) => async dispatch => {
  let { id } = params
  id = id ? id : `new`
  const options = {
    url: `${NAME}/${id}`,
  }
  return await fetchDispatch({
    dispatch,
    actions:  GET_ONE,
    fetch:    { options, cookie },
  })
}

export const saveOne = (params, cookie) => async dispatch => {
  const { body } = params
  const { id } = body
  const isNew = isNil( id )
  const urlId = isNew ? `new` : id
  const options = {
    url: `${ NAME }/${ urlId }`,
    body,
  }
  return await fetchDispatch({
    dispatch,
    meta:     { isNew },
    actions:  SAVE_ONE,
    fetch:    { options, cookie },
  })
}
