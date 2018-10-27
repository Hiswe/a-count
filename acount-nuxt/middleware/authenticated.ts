import { AcountMeta, NuxtContext } from '../types/types'

function flattenMeta(acc, meta) {
  return { ...acc, ...meta }
}

export default async function authMiddleware(nuxtContext: NuxtContext) {
  const { store, redirect, route } = nuxtContext
  const meta: AcountMeta = route.meta.reduce(flattenMeta, {})
  const { authForbidden, authRequired } = meta
  const { user } = store.state.user
  console.log({ authForbidden, authRequired, user })
  if (authForbidden && user) return redirect(`/`)
  if (authRequired && !user) return redirect(`/account/login`)
}
