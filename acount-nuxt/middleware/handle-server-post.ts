import { AcountMeta, NuxtContext } from '../types/types'
import { LOGIN } from '../store/user'

const mappedPath2Actions = {
  [`/account/login`]: `user/${LOGIN}`,
}

export default async function postMiddleware(nuxtContext: NuxtContext) {
  const { req, store } = nuxtContext
  // https://stackoverflow.com/questions/52326963/expressjs-with-nuxtjs-middleware-passing-post-data-to-page
  if (process.client) return
  if (!req || req.method !== `POST`) return
  const action = mappedPath2Actions[req.url]
  if (!action) return
  await store.dispatch(action, req.body)
}
