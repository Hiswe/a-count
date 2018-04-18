import crio from 'crio'
import isNil from 'lodash.isnil'

import createActionNames from './utils/create-action-names'
import fetchDispatch from './utils/fetch-dispatch'

const NAME = `quotations`
export const GET_ACTIVE           = createActionNames( NAME, `get`  , `active`           )
export const GET_ARCHIVED         = createActionNames( NAME, `get`  , `archived`         )
export const GET_READY_INVOICE    = createActionNames( NAME, `get`  , `ready-to-invoice` )
export const GET_ALL_FOR_CUSTOMER = createActionNames( NAME, `get`  , `all-for-customer` )
export const GET_ONE              = createActionNames( NAME, `get`  , `one`              )
export const SAVE_ONE             = createActionNames( NAME, `post` , `one`              )
export const ARCHIVE              = createActionNames( NAME, `post` , `archive`          )
export const CREATE_INVOICE       = createActionNames( NAME, `post` , `convert`          )

const initialState = crio({
  isSaving: false,
  meta:     {
    active        : {},
    archived      : {},
    readyToInvoice: {},
  },
  active        : [],
  archived      : [],
  readyToInvoice: [],
  current:    {
    isLoading: true,
  },
})

export default function reducer(state = initialState, action) {
  const { type, payload, meta } = action

  switch ( type ) {

    case GET_ACTIVE.SUCCESS:
    case GET_ALL_FOR_CUSTOMER.SUCCESS:
      state = state.set( `active`, payload.rows )
      return  state.set( `meta.active`, payload.meta )

    case GET_ARCHIVED.SUCCESS:
      state = state.set( `archived`, payload.rows )
      return  state.set( `meta.archived`, payload.meta )

    case GET_READY_INVOICE.SUCCESS:
      state = state.set( `readyToInvoice`, payload.rows )
      return  state.set( `meta.readyToInvoice`, payload.meta )

    case GET_ONE.LOADING:
      return state.set( `current`, {
        isLoading: true,
        reference: `loading…`,
        products: [],
      })

    case SAVE_ONE.LOADING:
    case ARCHIVE.LOADING:
    case CREATE_INVOICE.LOADING:
      return state.set( `isSaving`, true )
    case ARCHIVE.DONE:
    case SAVE_ONE.DONE:
    case CREATE_INVOICE.DONE:
      return state.set( `isSaving`, false )

    case CREATE_INVOICE.SUCCESS: {
      const { id }      = meta
      // maybe the quotation isn't already in the listing
      const index       = state.get( `readyToInvoice` )
        .findIndex(quot => quot.id === id)
      const updated     = index < 0 ?  state
        : state.set( `readyToInvoice[${index}]`, payload )
      // always update the current quotation
      return updated.set( `current`, payload )
    }

    case ARCHIVE.SUCCESS: {
      const { id }         = meta
      const removeId       = quotation => quotation.id !== id
      const active         = state.get( `active` ).filter( removeId )
      const readyToInvoice = state.get( `readyToInvoice` ).filter( removeId )
      const updated        = state.set( `active`, active )
        .set( `readyToInvoice`, readyToInvoice )
        .set( `current`, payload )
      return updated
    }

    case GET_ONE.SUCCESS:
    case SAVE_ONE.SUCCESS:
      return state.set( `current`, payload )

    default:
      return state
  }
}

export const getActive = (params = {}, cookie) => async dispatch => {
  const options = {
    url: `${NAME}`,
    ...params,
  }
  await fetchDispatch({
    dispatch,
    actions:   GET_ACTIVE,
    fetch:    { options, cookie },
  })
}

export const getArchived = (params = {}, cookie) => async dispatch => {
  const options = {
    url: `${NAME}/archived`,
    ...params,
  }
  await fetchDispatch({
    dispatch,
    actions:   GET_ARCHIVED,
    fetch:    { options, cookie },
  })
}

export const getReadyToInvoice = (params = {}, cookie) => async dispatch => {
  const options = {
    url: `${NAME}/ready-to-invoice`,
    ...params,
  }
  await fetchDispatch({
    dispatch,
    actions:   GET_READY_INVOICE,
    fetch:    { options, cookie },
  })
}

export const getAllForCustomer = (params = {}, cookie) => async dispatch => {
  const { id, ...rest } = params
  const options = {
    url: `/customers/${ id }/${NAME}`,
    ...rest,
  }
  await fetchDispatch({
    dispatch,
    actions:   GET_ALL_FOR_CUSTOMER,
    fetch:    { options, cookie },
  })
}

export const getOne = (params, cookie) => async dispatch => {
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

export const saveOne = (params, cookie) => async dispatch => {
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

export const createInvoice = (params, cookie) => async dispatch => {
  const { id } = params
  const options = {
    url: `${ NAME }/${ id }/create-invoice`,
    body: {},
  }
  await fetchDispatch({
    dispatch,
    meta:     { id },
    actions:  CREATE_INVOICE,
    fetch:    { options, cookie },
  })
}
