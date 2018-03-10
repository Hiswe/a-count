import crio from 'crio'

const NAME = `notifications`

export const REMOVE  = `@concompte/${NAME}/remove`

const initialState = []

// Like in “auth” duck
// • listen to every action
// • catch only the one containing /error
// • TODO: render this list
export default function reducer(state = initialState, action) {
  if ( !crio.isCrio(state) ) state = crio( state )
  const { type, payload } = action
  const hasError = /\/error$/.test( type )
  if ( !payload ) return state
  state = state.push( payload )
  return state
}

