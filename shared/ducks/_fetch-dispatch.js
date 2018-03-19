import * as isoFetch from '../iso-fetch'

// Small utility to generate multiple dispatches
// • always get a “/fetch-start”
// • add a “/fetch-error” to the action type if something went wrong :)
// • always add a “/fetch-end”

const prefixes = {
  start: `fetch-start`,
  end:   `fetch-end`,
  error: `fetch-error`,
}

export function getFetchType( type, method ) {
  return {
    fetchStart:  `${ type }/${ method }/${ prefixes.start }`,
    fetchEnd:    `${ type }/${ method }/${ prefixes.end }`,
    fetchError:  `${ type }/${ method }/${ prefixes.error }`,
  }
}

export default async function fetchDispatch( params ) {
  const { dispatch, fetch, type } = params
  const { method, cookie, options } = fetch
  const { fetchStart, fetchEnd, fetchError } = getFetchType( type, method )
  dispatch({
    type:   fetchStart,
    payload: {}
  })
  const { payload } = await isoFetch[ method ]( options, cookie )
  dispatch({
    type:     payload.error ? fetchError : type,
    payload,
  })
  dispatch({
    type:   fetchEnd,
    payload: {}
  })
}
