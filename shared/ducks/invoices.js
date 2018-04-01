import crio from 'crio'
import isNil from 'lodash.isnil'

import createActionNames from './utils/create-action-names.js'
import fetchDispatch from './utils/fetch-dispatch.js'

const NAME = `invoices`
export const GET_ALL  = createActionNames( NAME, `get`, `all`)
export const GET_ONE  = createActionNames( NAME, `get`, `one` )
export const SAVE_ONE = createActionNames( NAME, `post`, `one` )

const initialState = crio({
  isSaving: false,
  list    : []   ,
  current : {}   ,
})

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch ( type ) {
    default:
      return state
  }
}
