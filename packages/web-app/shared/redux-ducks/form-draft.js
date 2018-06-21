import crio from 'crio'
import shortid from 'shortid'

import { createSyncActionName } from './utils/create-action-names'
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
import * as quotationsUtils from './form-draft-compute-quotation'

const NAME = `draft-form`
const LOADING = crio({
  isLoading: true,
  reference: `loading…`,
})

export const UPDATE_DRAFT = createSyncActionName(NAME, `update`, `draft`)
export const UPDATE_QUOTATION_DRAFT = createSyncActionName(
  NAME,
  `update`,
  `quotation-draft`
)

const initialState = crio({})

export default function reducer(state = initialState, action) {
  const { type, payload, meta } = action

  switch (type) {
    case QUOTATION_GET_ONE.LOADING:
    case INVOICE_GET_ONE.LOADING:
    case CUSTOMER_GET_ONE.LOADING:
    case ACCOUNT_GET.LOADING: {
      state = LOADING.set(`_draftId`, shortid())
      return state
    }

    case INVOICE_GET_ONE.SUCCESS:
    case CUSTOMER_GET_ONE.SUCCESS: {
      state = crio(payload)
      return state
    }

    case ACCOUNT_UPDATE.SUCCESS:
    case ACCOUNT_GET.SUCCESS: {
      state = crio(payload.user)
      return state
    }

    case QUOTATION_GET_ONE.SUCCESS:
    case UPDATE_QUOTATION_DRAFT: {
      console.log(`—————— QUOTATION_GET_ONE.SUCCESS`)
      console.log(payload)
      console.log(`—————— QUOTATION_GET_ONE.SUCCESS ——————`)
      console.log(`       QUOTATION_GET_ONE.SUCCESS ——————`)
      console.log(quotationsUtils.recomputeFormData(crio(payload)))
      state = quotationsUtils.recomputeFormData(crio(payload))
      return state
    }

    case UPDATE_DRAFT: {
      state = crio(payload)
      return state
    }

    default:
      return state
  }
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
