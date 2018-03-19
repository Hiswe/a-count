import crio from 'crio'

import { getFetchType } from './_fetch-dispatch'

const NAME = `loading`

const initialState = {
  isFetching: false,
  fetchQueue: 0,
  isPosting:  false,
  postQueue:  0,
}

const fetchGet  = getFetchType( ``, `get` )
const fetchPost = getFetchType( ``, `post` )

const fetchStartRegexp  = new RegExp( `${ fetchGet.fetchStart }$` )
const fetchEndRegexp    = new RegExp( `${ fetchGet.fetchEnd }$` )
const postStartRegexp   = new RegExp( `${ fetchPost.fetchStart }$` )
const postEndRegexp     = new RegExp( `${ fetchPost.fetchEnd }$` )

export default function reducer( state = initialState, action ) {
  if ( !crio.isCrio(state) ) state = crio( state )
  const { type, payload } = action
  const isFetching      = fetchStartRegexp.test( type )
  const isFetchingDone  = fetchEndRegexp.test( type )
  const isPosting       = postStartRegexp.test( type )
  const isPostingDone   = postEndRegexp.test( type )

  if ( isFetching ) {
    console.log( `fetching start`, type )
    state = state.set( `isFetching`, true )
    state = state.set( `fetchQueue`, state.fetchQueue + 1 )
    return state
  }

  if ( isFetchingDone ) {
    console.log( `fetching done`, type )
    const newQueue = state.fetchQueue - 1
    state = state.set( `isFetching`, newQueue > 0 )
    state = state.set( `fetchQueue`, newQueue )
    return state
  }

  if ( isPosting ) {
    console.log( `posting start`, type )
    state = state.set( `isPosting`, true )
    state = state.set( `postQueue`, state.postQueue + 1 )
    return state
  }

  if ( isPostingDone ) {
    console.log( `posting done`, type )
    const newQueue = state.postQueue - 1
    state = state.set( `isPosting`, newQueue > 0 )
    state = state.set( `postQueue`, newQueue )
    return state
  }

  return state

}
