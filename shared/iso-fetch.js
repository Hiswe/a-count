import 'isomorphic-fetch'
import merge from 'lodash.merge'
import urlJoin from 'url-join'

// Thin wrapper around the fetch API
// • API_URL is defined by webpack
// • We return both the response * the JSON
//   The response can be used server-side for accessing the Header (for example)
//   Useful if we need to access the cookies
// • Cookie param is used server side:
//   We dont' have access to them there ^^
//   https://github.com/matthew-andrews/isomorphic-fetch/issues/83

const get = async ({url}, cookie) => {
  const options = {
    method: `GET`,
    credentials: `include`,
    headers: {
    },
  }
  if ( cookie ) options.headers.Cookie = cookie
  const response = await fetch( urlJoin(API_URL, url), options )
  const payload = await response.json()
  if (!response.ok) {
    merge( payload, {
      error:      true,
      status:     response.status,
      statusText: response.statusText,
    })
  }
  return {
    response,
    payload,
  }
}

const post = async ({url, body}, cookie) => {
  const options = {
    method: `POST`,
    credentials: `include`,
    headers: {
      'Content-Type': `application/json`,
    },
    body: JSON.stringify( body )
  }
  if ( cookie ) options.headers.Cookie = cookie
  const response = await fetch( urlJoin(API_URL, url), options )
  const payload = await response.json()
  if (!response.ok) {
    merge( payload, {
      error:      true,
      status:     response.status,
      statusText: response.statusText,
    })
  }
  return {
    response,
    payload,
  }
}

export { get, post }
