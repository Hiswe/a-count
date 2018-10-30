import { NuxtContext } from '../types/nuxt'
import { AcountMeta } from '../types/acount'
import { LOGIN, REGISTER, SET_PASSWORD } from '../store/user'

const mappedPath2Actions = {
  [`/account/login`]: `user/${LOGIN}`,
  [`/account/register`]: `user/${REGISTER}`,
  [`/account/set-password`]: `user/${SET_PASSWORD}`,
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
