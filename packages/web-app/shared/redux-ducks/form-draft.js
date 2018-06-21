import crio from 'crio'
import shortid from 'shortid'

import config from '../isomorphic-config'
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

const NAME = `draft-form`
const LOADING = crio({
  isLoading: true,
  reference: `loading…`,
})

export const UPDATE_DRAFT = createSyncActionName(NAME, `update`, `draft`)

const initialState = crio({})

export default function reducer(state = initialState, action) {
  const { type, payload, meta } = action

  switch (type) {
    case QUOTATION_GET_ONE.LOADING:
    case INVOICE_GET_ONE.LOADING:
    case CUSTOMER_GET_ONE.LOADING:
    case ACCOUNT_GET.LOADING: {
      state = LOADING.set(`draftId`, shortid())
      return state
    }

    case QUOTATION_GET_ONE.SUCCESS:
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
