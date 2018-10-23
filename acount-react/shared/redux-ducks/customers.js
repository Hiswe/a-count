import crio from 'crio'
import isNil from 'lodash.isnil'

import createActionNames from './utils/create-action-names'
import dispatchFetchActions from './utils/dispatch-fetch-actions'

const NAME = `customers`
export const GET_ALL = createActionNames(NAME, `get`, `all`)
export const GET_ONE = createActionNames(NAME, `get`, `one`)
export const SAVE_ONE = createActionNames(NAME, `post`, `one`)

export const LOADING = crio({
  isLoading: true,
  reference: `loading…`,
})

const initialState = crio({
  isSaving: false,
  active: [],
  meta: {
    all: {},
  },
  current: LOADING,
})

export default function reducer(state = initialState, action) {
  const { type, payload, meta } = action

  switch (type) {
    case GET_ALL.SUCCESS:
      state = state.set(`active`, payload.rows)
      return state.set(`meta.active`, payload.meta)

    case GET_ONE.LOADING:
      return state.set(`current`, LOADING)

    case GET_ONE.SUCCESS:
      return state.set(`current`, payload)

    case SAVE_ONE.LOADING:
      return state.set(`isSaving`, true)
    case SAVE_ONE.DONE:
      return state.set(`isSaving`, false)
    case SAVE_ONE.SUCCESS:
      return state.set(`current`, payload)

    default:
      return state
  }
}

export const getAll = (params = {}, jwt) => async dispatch => {
  const options = {
    url: `${NAME}`,
    ...params,
  }
  return await dispatchFetchActions({
    dispatch,
    actions: GET_ALL,
    fetch: { options, jwt },
  })
}

export const getOne = (params, jwt) => async dispatch => {
  let { id } = params
  id = id ? id : `new`
  const options = {
    url: `${NAME}/${id}`,
  }
  return await dispatchFetchActions({
    dispatch,
    actions: GET_ONE,
    fetch: { options, jwt },
  })
}

export const saveOne = (params, jwt) => async dispatch => {
  const { body } = params
  const { id } = body
  const isNew = isNil(id)
  const urlId = isNew ? `new` : id
  const options = {
    url: `${NAME}/${urlId}`,
    body,
  }
  return await dispatchFetchActions({
    dispatch,
    meta: { isNew },
    actions: SAVE_ONE,
    fetch: { options, jwt },
  })
}
