import 'isomorphic-fetch'
import merge from 'lodash.merge'
import isNil from 'lodash.isnil'
import urlJoin from 'url-join'
import Cookies from 'js-cookie'

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
  const options = merge( {}, defaultOptions, {
    method: method.toUpperCase()
  })
  if ( options.method === `POST` ) {
    options.headers[`Content-Type`] = `application/json`
  }

  return async function( params, cookie ) {
    const { url, body } = params
    if ( options.method === `POST` ) options.body = JSON.stringify( body )
    if ( cookie ) options.headers.Cookie = cookie
    try {
      const response  = await fetch( urlJoin(config.API_URL, url), options )
      const payload   = await response.json()
      if ( !response.ok ) {
        merge( payload, {
          error:      true,
          status:     response.status,
          statusText: response.statusText,
        })
      }
      // copy access token to a cookie
      if ( process.env.BROWSER ) {
        const accessToken = payload.access_token
        if ( !isNil( accessToken ) ) {
          Cookies.set( config.API_COOKIE_NAME, accessToken )
          delete payload.access_token
        }
      }
      return { response, payload}
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

export const get = create( `get` )
export const post = create( `post` )
