import crio from 'crio'
import isNil from 'lodash.isnil'

import createActionNames from './utils/create-action-names.js'
import fetchDispatch from './utils/fetch-dispatch.js'

const NAME = `quotations`
export const GET_ALL              = createActionNames( NAME, `get`  , `all`     )
export const GET_ONE              = createActionNames( NAME, `get`  , `one`     )
export const SAVE_ONE             = createActionNames( NAME, `post` , `one`     )
export const QUOTATION_TO_INVOICE = createActionNames( NAME, `post` , `convert` )

const initialState = crio({
  isSaving:   false,
  list:       [],
  current:    {
    isLoading: true,
  },
})

export default function reducer(state = initialState, action) {
  const { type, payload, meta } = action

  switch ( type ) {

    case GET_ALL.SUCCESS:
      console.log( `GET_ALL.SUCCESS` )
      return state.set( `list`, payload.list )

    case GET_ONE.LOADING:
      return state.set( `current`, {
        isLoading: true,
        reference: `loading…`,
        products: [],
      })
    case GET_ONE.SUCCESS:
      console.log( `GET_ONE.SUCCESS` )
      return state.set( `current`, payload )

    case QUOTATION_TO_INVOICE.LOADING:
      return state.set( `isSaving`, true )
    case QUOTATION_TO_INVOICE.DONE:
      return state.set( `isSaving`, false )
    case QUOTATION_TO_INVOICE.SUCCESS: {
      const { id }      = meta
      const index       = state.get( `list` ).findIndex(quot => quot.id === id)
      const updated     = state.set( `list[${index}]`, payload )
      return updated.set( `current`, payload )
    }

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
  const { id } = body
  const isNew = isNil( id )
  const urlId = isNew ? `new` : id
  const options = {
    url: `${ NAME }/${ urlId }`,
    body,
  }
  await fetchDispatch({
    dispatch,
    meta:     { isNew },
    actions:  SAVE_ONE,
    fetch:    { options, cookie },
  })
}

export const convert = ({params, cookie}) => async dispatch => {
  console.log( params )
  const { id } = params
  const options = {
    url: `${ NAME }/${ id }/convert-to-invoice`,
    body: {},
  }
  await fetchDispatch({
    dispatch,
    meta:     { id },
    actions:  QUOTATION_TO_INVOICE,
    fetch:    { options, cookie },
  })
}
