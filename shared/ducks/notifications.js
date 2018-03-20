import crio from 'crio'

import { getFetchType } from './_fetch-dispatch'

const NAME = `notifications`

export const REMOVE  = `@concompte/${NAME}/remove`

const fetchGet  = getFetchType( ``, `get` )
const fetchPost = getFetchType( ``, `post` )
const getErrorRegexp  = new RegExp( `${ fetchGet.fetchError }$` )
const postErrorRegexp = new RegExp( `${ fetchPost.fetchError }$` )
const postSuccessRegexp = new RegExp( `${ fetchPost.fetchSuccess }$` )

const initialState = []

// Like in “user” duck
// • listen to every action
// • catch only the one containing /error

export default function reducer( state = initialState, action ) {
  if ( !crio.isCrio(state) ) state = crio( state )
  const { type, payload } = action
  const hasError = getErrorRegexp.test( type ) || postErrorRegexp.test( type )
  const hasPostSuccess = postSuccessRegexp.test( type )

  if ( hasError ) {
    payload._id = new Date().valueOf()
    state = state.push( payload )
    return state
  }

  if ( hasPostSuccess ) {
    state = state.push({
      _id: new Date().valueOf(),
      message: `save success`,
    })
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
