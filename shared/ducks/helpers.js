import 'isomorphic-fetch'
import urlJoin from 'url-join'

const leadingSlash = /^\//
const cleanUrl = url => {
  if ( leadingSlash.test(url) ) url = url.replace( leadingSlash, ``)
  return url
}

// API_URL is defined by webpack

const fetchGet = async (url) => {
  url = cleanUrl(url)
  const fetchResult = await fetch( urlJoin(API_URL, url) )
  const result = await fetchResult.json()
  if (!fetchResult.ok) {
    Object.assign( result, {
      error:      true,
      status:     fetchResult.status,
      statusText: fetchResult.statusText,
    })
  }
  return result.payload
}

const fetchPost = async (url, body) => {
  url = cleanUrl(url)
  const fetchResult = await fetch( urlJoin(API_URL, url), {
    method: `POST`,
    headers: {
      'Content-Type': `application/json`,
    },
    body: JSON.stringify( body )
  })
  const result = await fetchResult.json()
  if (!fetchResult.ok) {
    Object.assign( result, {
      error:      true,
      status:     fetchResult.status,
      statusText: fetchResult.statusText,
    })
  }
  return result.payload
}

export { fetchGet, fetchPost }
