import 'isomorphic-fetch'
import merge       from 'lodash.merge'
import isNil       from 'lodash.isnil'
import urlJoin     from 'url-join'
import Cookies     from 'js-cookie'
import queryString from 'query-string'

import config from './isomorphic-config.js'

// Thin wrapper around the fetch API
// • We return both the response & the JSON
//   The response can be used server-side for accessing the Header (for example)
//   Useful if we need to access the cookies
// • Cookie param is used server side:
//   We dont' have access to them there ^^
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

  return async function( options, cookie ) {
    const { url, body, query } = options
    // set body on post
    if ( method === `post` ) fetchOptions.body = JSON.stringify( body )
    // force cookie if server side
    if ( cookie ) fetchOptions.headers.Cookie = cookie
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
        const accessToken = payload.access_token
        if ( !isNil( accessToken ) ) {
          Cookies.set( config.API_COOKIE_NAME, accessToken )
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
