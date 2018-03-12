import crio from 'crio'

const NAME = `notifications`

export const REMOVE  = `@concompte/${NAME}/remove`

const initialState = []

// Like in “user” duck
// • listen to every action
// • catch only the one containing /error

export default function reducer(state = initialState, action) {
  if ( !crio.isCrio(state) ) state = crio( state )
  const { type, payload } = action
  const hasError = /\/error$/.test( type )
  if ( !hasError ) return state
  payload._id = new Date().valueOf()
  state = state.push( payload )
  return state
}

export const removeOne = params => async dispatch => {
  return true
  // const { body } = params
  // let { id } = body
  // id = id ? id : `new`
  // const fetchOptions = {
  //   url: `${NAME}/${id}`,
  //   body,
  // }
  // const { payload } = await post( fetchOptions, cookie )
  // dispatch({
  //   type: SAVE_ONE,
  //   payload,
  // })
}

