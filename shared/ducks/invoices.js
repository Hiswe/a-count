import crio from 'crio'
import isNil from 'lodash.isnil'

import createActionNames from './utils/create-action-names'
import fetchDispatch from './utils/fetch-dispatch'
import { CONVERT } from './quotations'

const NAME = `invoices`
export const LIST_ACTIVE       = createActionNames( NAME, `get`  , `list-active`       )
export const LIST_ARCHIVED     = createActionNames( NAME, `get`  , `list-archived`     )
export const LIST_FOR_CUSTOMER = createActionNames( NAME, `get`  , `list-for-customer` )
export const GET_ONE           = createActionNames( NAME, `get`  , `one`               )
export const SAVE_ONE          = createActionNames( NAME, `post` , `one`               )
export const ARCHIVE           = createActionNames( NAME, `post` , `archive`           )

const initialState = crio({
  isSaving: false,
  meta: {
    active  : {},
    archived: {},
  },
  active   : [],
  archived : [],
  current:  {
    isLoading: true,
  },
})

export default function reducer(state = initialState, action) {
  const { type, payload, meta } = action

  switch ( type ) {

    case LIST_ACTIVE.SUCCESS:
    case LIST_FOR_CUSTOMER.SUCCESS:
      state = state.set( `active`, payload.rows )
      return  state.set( `meta.active`, payload.meta )

    case LIST_ARCHIVED.SUCCESS:
      state = state.set( `archived`, payload.rows )
      return  state.set( `meta.archived`, payload.meta )

    case GET_ONE.LOADING:
      return state.set( `current`, {
        isLoading: true,
        reference: `loading…`,
        products: [],
      })

    case GET_ONE.SUCCESS:
      return state.set( `current`, payload )

    case ARCHIVE.SUCCESS: {
      const { id }      = meta
      const removeId    = invoice => invoice.id !== id
      const active      = state.get( `active` ).filter( removeId )
      const updated     = state.set( `active`, active )
        .set( `current`, payload )
      return updated
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

export const listActive = (params = {}, cookie) => async dispatch => {
  const options = {
    url: `${NAME}`,
    ...params,
  }
  await fetchDispatch({
    dispatch,
    actions:   LIST_ACTIVE,
    fetch:    { options, cookie },
  })
}

export const listArchived = (params = {}, cookie) => async dispatch => {
  const options = {
    url: `${NAME}/archived`,
    ...params,
  }
  await fetchDispatch({
    dispatch,
    actions:   LIST_ARCHIVED,
    fetch:    { options, cookie },
  })
}

export const listForCustomer = (params = {}, cookie) => async dispatch => {
  const { id, ...rest } = params
  const options = {
    url: `/customers/${ id }/${NAME}`,
    ...rest,
  }
  await fetchDispatch({
    dispatch,
    actions:   LIST_FOR_CUSTOMER,
    fetch:    { options, cookie },
  })
}

export const getOne = (params, cookie) => async dispatch => {
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

export const saveOne = (params, cookie) => async dispatch => {
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

export const archiveOne = (params, cookie) => async dispatch => {
  const { id } = params
  const options = {
    url: `${ NAME }/${ id }/archive`,
    body: {},
  }
  await fetchDispatch({
    dispatch,
    meta:     { id },
    actions:  ARCHIVE,
    fetch:    { options, cookie },
  })
}
