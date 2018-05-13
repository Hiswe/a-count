import crio  from 'crio'
import merge from 'lodash.merge'

import * as isoFetch from '../../iso-fetch'

export default async function fetchDispatch( params ) {
  const { dispatch, fetch, actions, meta = {} } = params
  const { options, jwt }    = fetch
  const { method = `get` }  = actions
  dispatch({
    type:   actions.LOADING,
    payload: {
      loading: true,
    },
  })
  try {
    const { payload } = await isoFetch[ method ]( options, jwt )
    dispatch({
      type:     actions.DONE,
      meta,
      payload:  {}
    })
    if ( payload.error )  {
      dispatch({
        type:     actions.ERROR,
        meta:     merge( { _fetchDispatchErrorType: `RESPONSE_ERROR` }, meta ),
        error:    true,
        payload:  payload,
      })
    } else {
      dispatch({
        type:     actions.SUCCESS,
        meta,
        payload:  payload,
      })
    }
  } catch (err) {
    dispatch({
      type:     actions.DONE,
      meta,
      payload:  {}
    })
    dispatch({
      type:     actions.ERROR,
      meta:     merge( { _fetchDispatchErrorType: `FETCH_ERROR` }, meta ),
      error:    true,
      payload:  err,
    })
  }
}
