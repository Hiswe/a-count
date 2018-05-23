import 'isomorphic-fetch'
import merge       from 'lodash.merge'
import isNil       from 'lodash.isnil'
import urlJoin     from 'url-join'
import Cookies     from 'js-cookie'
import queryString from 'query-string'

import config from './isomorphic-config'

// Thin wrapper around the fetch API
// • We return both the response & the JSON
//   The response can be used server-side for accessing the Header (for example)
//   Useful if we need to access the cookies
// • jwt param is used server side:
//   We dont' have access to cookies there ^^
//   https://github.com/matthew-andrews/isomorphic-fetch/issues/83

const defaultOptions = {
  credentials: `include`,
  headers: {},
}

function create( method ) {
  const fetchOptions = merge( {}, defaultOptions, {
    method: method.toUpperCase()
  })
  // we communicate to the API only in json
  if ( method === `post` ) {
    fetchOptions.headers[`Content-Type`] = `application/json`
  }

  return async function( options, jwt = false ) {
    const { url, body, query } = options
    // set body on post
    if ( method === `post` ) fetchOptions.body = JSON.stringify( body )
    // set the right authorization header
    // • if jwt is present it will be because
    //   the server read it from the cookie and passed it here
    if ( !jwt && process.env.BROWSER ) {
      jwt = Cookies.get( config.COOKIE_NAME )
    }
    fetchOptions.headers.Authorization = `Bearer ${ jwt }`
    // Build fetch url
    // • we need to append the query string as the fetch API doesn't handle other ways
    let fetchUrl = urlJoin( config.API_URL, url )
    if ( query ) fetchUrl = urlJoin( fetchUrl, `?${queryString.stringify( query )}`)

    try {
      const response  = await fetch( fetchUrl, fetchOptions )
      const payload   = await response.json()
      if ( !response.ok ) {
        merge( payload, {
          error:      true,
          status:     response.status,
          statusText: response.statusText,
        })
      }
      // copy access token to a cookie
      // • we will need this cookie for universal render
      if ( process.env.BROWSER ) {
        const { access_token } = payload
        if ( !isNil( access_token ) ) {
          Cookies.remove( config.COOKIE_NAME )
          Cookies.set( config.COOKIE_NAME, access_token )
          delete payload.access_token
        }
      }
      return { response, payload }
    } catch(err) {
      const error = merge({
        error:      true,
        status:     500,
        statusText: err.message,
      }, err )
      return { payload: error }
    }
  }
}

//----- EXPORTS

export const get  = create( `get`  )
export const post = create( `post` )
