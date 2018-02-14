import 'isomorphic-fetch'

// TODO check how we can import config in a Universal app
//   - don't want to embed rc browser-side
//   - has to be different while compiled in 'dev' or 'prod' environment

const apiEndpoint = `http://localhost:3000/api/v1/`

const get = async (url) => {
  const fetchResult = await fetch(`${apiEndpoint}${url}`)
  const result      = await fetchResult.json()
  return result.payload
}

const post = async (url, body) => {
  const fetchResult = await fetch(`${apiEndpoint}${url}`, {
    method: `POST`,
    headers: {
      'Content-Type': `application/json`,
    },
    body: JSON.stringify( body )
  })
  const result      = await fetchResult.json()
  return result.payload
}

export { get, post }
