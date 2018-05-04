import crio from 'crio'
import isNil from 'lodash.isnil'

import createActionNames from './utils/create-action-names'
import fetchDispatch from './utils/fetch-dispatch'

const NAME = `quotations`
export const LIST_ACTIVE            = createActionNames( NAME, `get`  , `list-active`           )
export const LIST_ARCHIVED          = createActionNames( NAME, `get`  , `list-archived`         )
export const LIST_GET_READY_INVOICE = createActionNames( NAME, `get`  , `list-ready-to-invoice` )
export const LIST_FOR_CUSTOMER      = createActionNames( NAME, `get`  , `list-for-customer`     )
export const GET_ONE                = createActionNames( NAME, `get`  , `one`                   )
export const SAVE_ONE               = createActionNames( NAME, `post` , `one`                   )
export const ARCHIVE_QUOTE          = createActionNames( NAME, `post` , `archive`               )
export const CREATE_INVOICE         = createActionNames( NAME, `post` , `convert`               )

export const LOADING = crio({
  isLoading: true,
  reference: `loading…`,
  products: [],
})

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
  current:      LOADING,
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
    case LIST_GET_READY_INVOICE.SUCCESS:
      state = state.set( `readyToInvoice`, payload.rows )
      return  state.set( `meta.readyToInvoice`, payload.meta )

    // Be sure to reset current
    // • we don't want a “show” page to have legacy datas to begin with
    case LIST_ACTIVE.LOADING:
    case LIST_ARCHIVED.LOADING:
    case LIST_GET_READY_INVOICE.LOADING:
    case LIST_FOR_CUSTOMER.LOADING:
    case GET_ONE.LOADING:
      return state.set( `current`, LOADING )

    case SAVE_ONE.LOADING:
    case ARCHIVE_QUOTE.LOADING:
    case CREATE_INVOICE.LOADING:
      return state.set( `isSaving`, true )
    case SAVE_ONE.DONE:
    case ARCHIVE_QUOTE.DONE:
    case CREATE_INVOICE.DONE:
      return state.set( `isSaving`, false )

    case GET_ONE.SUCCESS:
    case SAVE_ONE.SUCCESS:
      return state.set( `current`, payload )

    case ARCHIVE_QUOTE.SUCCESS: {
      const { id }         = meta
      const removeId       = quotation => quotation.id !== id
      const active         = state.get( `active` ).filter( removeId )
      const readyToInvoice = state.get( `readyToInvoice` ).filter( removeId )
      const updated        = state.set( `active`, active )
        .set( `readyToInvoice`, readyToInvoice )
        .set( `current`, payload )
      return updated
    }

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

    default:
      return state
  }
}

export const listActive = (params = {}, jwt) => async dispatch => {
  const options = {
    url: `${NAME}`,
    ...params,
  }
  await fetchDispatch({
    dispatch,
    actions:   LIST_ACTIVE,
    fetch:    { options, jwt },
  })
}

export const listArchived = (params = {}, jwt) => async dispatch => {
  const options = {
    url: `${NAME}/archived`,
    ...params,
  }
  await fetchDispatch({
    dispatch,
    actions:   LIST_ARCHIVED,
    fetch:    { options, jwt },
  })
}

export const listReadyToInvoice = (params = {}, jwt) => async dispatch => {
  const options = {
    url: `${NAME}/ready-to-invoice`,
    ...params,
  }
  await fetchDispatch({
    dispatch,
    actions:   LIST_GET_READY_INVOICE,
    fetch:    { options, jwt },
  })
}

export const listForCustomer = (params = {}, jwt) => async dispatch => {
  const { id, ...rest } = params
  const options = {
    url: `/customers/${ id }/${NAME}`,
    ...rest,
  }
  await fetchDispatch({
    dispatch,
    actions:   LIST_FOR_CUSTOMER,
    fetch:    { options, jwt },
  })
}

export const getOne = (params, jwt) => async dispatch => {
  let { id } = params
  id = id ? id : `new`
  const options = {
    url: `${NAME}/${id}`,
  }
  await fetchDispatch({
    dispatch,
    actions: GET_ONE,
    fetch:    { options, jwt },
  })
}

export const saveOne = (params, jwt) => async dispatch => {
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
    fetch:    { options, jwt },
  })
}

export const archiveOne = (params, jwt) => async dispatch => {
  const { id } = params
  const options = {
    url: `${ NAME }/${ id }/archive`,
    body: {},
  }
  await fetchDispatch({
    dispatch,
    meta:     { id },
    actions:  ARCHIVE_QUOTE,
    fetch:    { options, jwt },
  })
}

export const createInvoice = (params, jwt) => async dispatch => {
  const { id } = params
  const options = {
    url: `${ NAME }/${ id }/create-invoice`,
    body: {},
  }
  await fetchDispatch({
    dispatch,
    meta:     { id },
    actions:  CREATE_INVOICE,
    fetch:    { options, jwt },
  })
}
