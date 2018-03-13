import * as isoFetch from '../iso-fetch'

// Small utility to generate dispatches
// • always get a start
// • add a “/error” to the action type if something went wrong :)

const fetchDispatch = async params => {
  const { dispatch, request, type } = params
  dispatch({
    type: `${type}/start`,
    payload: {}
  })
  const { payload } = await request
  dispatch({
    type: `${ type }${ payload.error ? '/error' : '' }`,
    payload,
  })
}

export default fetchDispatch
