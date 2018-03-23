import * as isoFetch from '../../iso-fetch'
import crio from 'crio'

export default async function fetchDispatch( params ) {
  const { dispatch, fetch, actions } = params
  const { cookie, options } = fetch
  console.log( options )
  const { method = 'get' } = actions
  dispatch({
    type:   actions.LOADING,
    payload: {
      loading: true,
    },
  })
  try {
    const { payload } = await isoFetch[ method ]( options, cookie )
    if ( payload.error )  {
      dispatch({
        type:     actions.ERROR,
        meta:     { type: `API_ERROR` },
        error:    true,
        payload:  payload,
      })
    } else {
      dispatch({
        type:     actions.SUCCESS,
        payload:  payload,
      })
    }
  } catch (err) {
    dispatch({
      type:     actions.ERROR,
      meta:     { type: `FETCH_ERROR` },
      error:    true,
      payload:  err,
    })
  }
  dispatch({
    type:     actions.DONE,
    payload:  {}
  })
}
