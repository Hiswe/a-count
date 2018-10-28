import { AcountMeta, NuxtContext } from '../types/types'

export default async function postMiddleware(nuxtContext: NuxtContext) {
  const { req, store } = nuxtContext
  // https://stackoverflow.com/questions/52326963/expressjs-with-nuxtjs-middleware-passing-post-data-to-page
  if (process.client) return
  if (!req || req.method !== `POST`) return
  console.log(req.url)
  console.log(req.body)
}
