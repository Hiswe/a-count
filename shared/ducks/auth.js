import crio from 'crio'

const NAME = `auth`

const initialState = {
  isConnected:  false,
}

// determine current connection status
// • listen to every action
// • catch only the one containing /error
export default function reducer(state = initialState, action) {
  if ( !crio.isCrio(state) ) state = crio( state )
  const { type, payload } = action
  const hasError = /\/error$/.test( type )
  if ( !payload ) return state
  const isUnauthorized = payload.status === 401
  if ( hasError && isUnauthorized ) {
    state = state.set( `isConnected`, false )
  } else if ( !hasError ) {
    state = state.set( `isConnected`, true )
  }
  return state
}
