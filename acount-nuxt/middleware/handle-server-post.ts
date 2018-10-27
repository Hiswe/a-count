import { AcountMeta, NuxtContext } from '../types/types'

export default async function postMiddleware(nuxtContext: NuxtContext) {
  // https://stackoverflow.com/questions/52326963/expressjs-with-nuxtjs-middleware-passing-post-data-to-page
  if (process.client) return
}
