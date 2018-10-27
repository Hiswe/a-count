function flattenMeta(acc, meta) {
  return { ...acc, ...meta }
}

export default async function authMiddleware(nuxtContext) {
  const { store, redirect, route } = nuxtContext
  console.log(`authMiddleware`)
  const meta = route.meta.reduce(flattenMeta, {})
  console.log(meta)
  if (store.state.user) return
}
