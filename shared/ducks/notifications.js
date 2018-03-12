import crio from 'crio'

const NAME = `notifications`

export const REMOVE  = `@concompte/${NAME}/remove`

const initialState = []

// Like in “user” duck
// • listen to every action
// • catch only the one containing /error

export default function reducer( state = initialState, action ) {
  if ( !crio.isCrio(state) ) state = crio( state )
  const { type, payload } = action
  const hasError = /\/error$/.test( type )

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

