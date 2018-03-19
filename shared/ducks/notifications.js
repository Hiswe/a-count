import crio from 'crio'

import { getFetchType } from './_fetch-dispatch'

const NAME = `notifications`

export const REMOVE  = `@concompte/${NAME}/remove`

const fetchGet  = getFetchType( ``, `get` )
const fetchPost = getFetchType( ``, `post` )
const getErrorRegexp  = new RegExp( `${ fetchGet.fetchError }$` )
const postErrorRegexp = new RegExp( `${ fetchPost.fetchError }$` )

const initialState = []
// const initialState = [{
//   _id: `error`,
//   error: `fake error`,
//   message: `fake error content`,
// }, {
//   _id: `notif`,
//   message: `fake notification content`,
// }]

// Like in “user” duck
// • listen to every action
// • catch only the one containing /error

export default function reducer( state = initialState, action ) {
  if ( !crio.isCrio(state) ) state = crio( state )
  const { type, payload } = action
  const hasError = getErrorRegexp.test( type ) || postErrorRegexp.test( type )

  if ( hasError ) {
    payload._id = new Date().valueOf()
    state = state.push( payload )
    return state
  }

  switch ( type ) {
    case REMOVE:
      const index = state.indexOf( payload )
      state = state.splice( index, 1 )
      return state

    default:
      return state
  }
}

export const removeOne = params => async dispatch => {
  dispatch({
    type: REMOVE,
    payload: params,
  })
}

