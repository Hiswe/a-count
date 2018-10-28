import { NuxtContext } from '../types/nuxt'
import { AcountMeta } from '../types/types'

function flattenMeta(acc, meta) {
  return { ...acc, ...meta }
}

export default async function authMiddleware(nuxtContext: NuxtContext) {
  const { store, redirect, route } = nuxtContext
  const meta: AcountMeta = route.meta.reduce(flattenMeta, {})
  const { authForbidden, authRequired } = meta
  const { user } = store.state.user
  console.log({
    authForbidden,
    authRequired,
    user: store.state.user.user != null,
  })
  if (authForbidden && user) return redirect(`/`)
  if (authRequired && !user) return redirect(`/account/login`)
}
