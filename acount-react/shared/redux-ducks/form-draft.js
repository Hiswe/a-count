import crio from 'crio'
import shortid from 'shortid'

import { createSyncActionName } from './utils/create-action-names'
import * as computeQuotation from '../utils/compute-quotation'
import * as computeInvoice from '../utils/compute-invoice'
import * as redirection from '../utils/check-redirection'
import * as QUOTATION from './quotations'
import * as INVOICE from './invoices'
import * as CUSTOMER from './customers'
import * as ACCOUNT from './account'

const NAME = `draft-form`
const LOADING = crio({
  isLoading: true,
  reference: `loading…`,
})

export const UPDATE_DRAFT = createSyncActionName(NAME, `update`, `draft`)
export const CLEAN_DRAFT = createSyncActionName(NAME, `clean`, `draft`)
export const CLEAN_REDIRECTION = createSyncActionName(NAME, `clean`, `redirect`)
export const UPDATE_QUOTATION_DRAFT = createSyncActionName(
  NAME,
  `update`,
  `quotation-draft`,
)
export const UPDATE_INVOICE_DRAFT = createSyncActionName(
  NAME,
  `update`,
  `invoice-draft`,
)

const initialState = LOADING.set(`_draftId`, shortid())

// prettier-ignore
const REDIRECTION_TEST = {
  [CUSTOMER.SAVE_ONE.SUCCESS]:  redirection.checkCustomer,
  [QUOTATION.GET_ONE.SUCCESS]:        redirection.checkQuotation,
  [QUOTATION.SAVE_ONE.SUCCESS]:       redirection.checkQuotation,
  [QUOTATION.CREATE_INVOICE.SUCCESS]: redirection.checkQuotation,
  [QUOTATION.ARCHIVE_QUOTE.SUCCESS]:  redirection.checkQuotation,
  [INVOICE.GET_ONE.SUCCESS]:    redirection.checkInvoice,
  [INVOICE.SAVE_ONE.SUCCESS]:   redirection.checkInvoice,
}

function getRedirectionStatus({ type, state, payload }) {
  if (!REDIRECTION_TEST[type]) return false
  return REDIRECTION_TEST[type]({ state, payload })
}

export default function reducer(state = initialState, action) {
  const { type, payload, meta } = action

  if (type === QUOTATION.CREATE_INVOICE.SUCCESS) {
    console.log(`QUOTATION.CREATE_INVOICE.SUCCESS`)
  }

  switch (type) {
    case CLEAN_DRAFT: {
      const newState = LOADING.set(`_draftId`, shortid())
      return newState
    }

    case CLEAN_REDIRECTION: {
      const newState = state.set(`_redirection`, false)
      return newState
    }

    case ACCOUNT.GET_ONE.LOADING:
    case CUSTOMER.GET_ONE.LOADING:
    case QUOTATION.GET_ONE.LOADING:
    case INVOICE.GET_ONE.LOADING: {
      const newState = LOADING.set(`_draftId`, shortid()).set(
        `_redirection`,
        getRedirectionStatus({ type, state, payload }),
      )
      return newState
    }

    case ACCOUNT.GET_ONE.SUCCESS:
    case ACCOUNT.SAVE_ONE.SUCCESS: {
      const newState = crio(payload.user)
        .set(`_draftId`, state.get(`_draftId`))
        .set(`_redirection`, getRedirectionStatus({ type, state, payload }))
      return newState
    }

    case CUSTOMER.GET_ONE.SUCCESS:
    case CUSTOMER.SAVE_ONE.SUCCESS: {
      const newState = crio(payload)
        .set(`_draftId`, state.get(`_draftId`))
        .set(`_redirection`, getRedirectionStatus({ type, state, payload }))
      return newState
    }
    case UPDATE_DRAFT: {
      const newState = crio(payload).set(`_draftId`, state.get(`_draftId`))
      return newState
    }

    case QUOTATION.GET_ONE.SUCCESS:
    case QUOTATION.SAVE_ONE.SUCCESS:
    case QUOTATION.CREATE_INVOICE.SUCCESS:
    case QUOTATION.ARCHIVE_QUOTE.SUCCESS: {
      const newState = computeQuotation
        .all(crio(payload))
        .set(`_draftId`, state.get(`_draftId`))
        .set(`_redirection`, getRedirectionStatus({ type, state, payload }))
      return newState
    }
    case UPDATE_QUOTATION_DRAFT: {
      const newState = computeQuotation
        .all(crio(payload))
        .set(`_draftId`, state.get(`_draftId`))
      return newState
    }

    case INVOICE.GET_ONE.SUCCESS:
    case INVOICE.SAVE_ONE.SUCCESS: {
      const newState = computeInvoice
        .all(crio(payload))
        .set(`_draftId`, state.get(`_draftId`))
        .set(`_redirection`, getRedirectionStatus({ type, state, payload }))
      return newState
    }
    case UPDATE_INVOICE_DRAFT: {
      const newState = computeInvoice
        .all(crio(payload))
        .set(`_draftId`, state.get(`_draftId`))
      return newState
    }

    default:
      return state
  }
}

export const cleanDraft = formData => async dispatch => {
  dispatch({
    type: CLEAN_DRAFT,
  })
}

export const cleanRedirection = formData => async dispatch => {
  dispatch({
    type: CLEAN_REDIRECTION,
  })
}

export const updateDraft = formData => async dispatch => {
  dispatch({
    type: UPDATE_DRAFT,
    payload: formData,
  })
}

export const updateQuotationDraft = formData => async dispatch => {
  dispatch({
    type: UPDATE_QUOTATION_DRAFT,
    payload: formData,
  })
}

export const updateInvoiceDraft = formData => async dispatch => {
  dispatch({
    type: UPDATE_INVOICE_DRAFT,
    payload: formData,
  })
}
