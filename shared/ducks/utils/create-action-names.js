import crio from 'crio'

const APP_PREFIX = `@concompte`

const prefixes = crio({
  loading:  `loading`,
  done:     `done`,
  success:  `success`,
  error:    `error`,
})

// Small utility to generate multiple dispatches type
// • always get a “/loading” and ”/done”
// • get on of “/success” or “/error” depending on the fetch result
// This could have been handled by a middleware too
// • https://github.com/pburtchaell/redux-promise-middleware
// • but I want to keep as much as I can away from libraries

export default function createActionNames( domain, method, name ) {
  const _method = method ? `/${ method }` : ``
  return {
    method:  method,
    LOADING: `${ APP_PREFIX }/${ domain }${ _method }/${ name }/${ prefixes.loading }`,
    DONE:    `${ APP_PREFIX }/${ domain }${ _method }/${ name }/${ prefixes.done }`,
    SUCCESS: `${ APP_PREFIX }/${ domain }${ _method }/${ name }/${ prefixes.success }`,
    ERROR:   `${ APP_PREFIX }/${ domain }${ _method }/${ name }/${ prefixes.error }`,
  }
}
