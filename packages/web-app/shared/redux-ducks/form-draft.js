import crio from 'crio'
import shortid from 'shortid'

import { createSyncActionName } from './utils/create-action-names'
import * as computeQuotation from '../utils/compute-quotation'
import * as redirection from '../utils/check-redirection'
import {
  GET_ONE as QUOTATION_GET_ONE,
  SAVE_ONE as QUOTATION_SAVE_ONE,
} from './quotations'
import {
  GET_ONE as INVOICE_GET_ONE,
  SAVE_ONE as INVOICE_SAVE_ONE,
} from './invoices'
import {
  GET_ONE as CUSTOMER_GET_ONE,
  SAVE_ONE as CUSTOMER_SAVE_ONE,
} from './customers'
import { GET_ONE as ACCOUNT_GET, UPDATE as ACCOUNT_UPDATE } from './account'

const NAME = `draft-form`
const LOADING = crio({
  isLoading: true,
  reference: `loading…`,
})

export const UPDATE_DRAFT = createSyncActionName(NAME, `update`, `draft`)
export const CLEAN_REDIRECT = createSyncActionName(NAME, `clean`, `redirect`)
export const UPDATE_QUOTATION_DRAFT = createSyncActionName(
  NAME,
  `update`,
  `quotation-draft`,
)

const initialState = crio({})

// prettier-ignore
const REDIRECTION_TEST = {
  [CUSTOMER_SAVE_ONE.SUCCESS]:  redirection.checkCustomer,
  [QUOTATION_GET_ONE.SUCCESS]:  redirection.checkQuotation,
  [QUOTATION_SAVE_ONE.SUCCESS]: redirection.checkQuotation,
  [INVOICE_GET_ONE.SUCCESS]:    redirection.checkInvoice,
  [INVOICE_SAVE_ONE.SUCCESS]:   redirection.checkInvoice,
}

function getRedirectionStatus({ type, state, payload }) {
  if (!REDIRECTION_TEST[type]) return false
  return REDIRECTION_TEST[type]({ state, payload })
}

export default function reducer(state = initialState, action) {
  const { type, payload, meta } = action

  switch (type) {
    case QUOTATION_GET_ONE.LOADING:
    case INVOICE_GET_ONE.LOADING:
    case CUSTOMER_GET_ONE.LOADING:
    case ACCOUNT_GET.LOADING: {
      const newState = LOADING.set(`_draftId`, shortid())
      return newState
    }

    case INVOICE_GET_ONE.SUCCESS:
    case INVOICE_SAVE_ONE.SUCCESS:
    case CUSTOMER_GET_ONE.SUCCESS:
    case CUSTOMER_SAVE_ONE.SUCCESS: {
      const newState = crio(payload)
        .set(`_draftId`, state.get(`_draftId`))
        .set(`_redirection`, getRedirectionStatus({ type, state, payload }))
      return newState
    }

    case ACCOUNT_UPDATE.SUCCESS:
    case ACCOUNT_GET.SUCCESS: {
      const newState = crio(payload.user).set(`_draftId`, state.get(`_draftId`))
      return newState
    }

    case QUOTATION_GET_ONE.SUCCESS:
    case QUOTATION_SAVE_ONE.SUCCESS: {
      const newState = computeQuotation
        .all(crio(payload))
        .set(`_draftId`, state.get(`_draftId`))
        .set(`_redirection`, getRedirectionStatus({ type, state, payload }))
      return newState
    }

    case CLEAN_REDIRECT: {
      const newState = state.set(`_redirection`, false)
      return newState
    }

    case UPDATE_QUOTATION_DRAFT: {
      const newState = computeQuotation
        .all(crio(payload))
        .set(`_draftId`, state.get(`_draftId`))
      return newState
    }

    case UPDATE_DRAFT: {
      const newState = crio(payload).set(`_draftId`, state.get(`_draftId`))
      return newState
    }

    default:
      return state
  }
}

export const cleanRedirection = formData => async dispatch => {
  dispatch({
    type: CLEAN_REDIRECT,
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
