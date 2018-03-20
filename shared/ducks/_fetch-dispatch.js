import * as isoFetch from '../iso-fetch'
import crio from 'crio'

// Small utility to generate multiple dispatches
// • always get a “/fetch-start”
// • add a “/fetch-error” to the action type if something went wrong :)
// • always add a “/fetch-end”

const prefixes = crio({
  start:    `fetch-start`,
  end:      `fetch-end`,
  success:  `fetch-success`,
  error:    `fetch-error`,
})

export function getFetchType( type, method ) {
  return {
    original:      type,
    fetchStart:   `${ type }/${ method }/${ prefixes.start }`,
    fetchSuccess: `${ type }/${ method }/${ prefixes.success }`,
    fetchError:   `${ type }/${ method }/${ prefixes.error }`,
    fetchEnd:     `${ type }/${ method }/${ prefixes.end }`,
  }
}

export default async function fetchDispatch( params ) {
  const { dispatch, fetch, type } = params
  const { method, cookie, options } = fetch
  const types = getFetchType( type, method )
  dispatch({
    type:   types.fetchStart,
    payload: {}
  })
  const { payload } = await isoFetch[ method ]( options, cookie )
  dispatch({
    type:     types[ payload.error ? `fetchError` : `fetchSuccess` ],
    payload,
  })
  // for compatibility reason, dispatch the original type
  // TODO: remove it
  if ( !payload.error )  {
    dispatch({
      type:     types.original,
      payload,
    })
  }
  dispatch({
    type:   types.fetchEnd,
    payload: {}
  })
}
