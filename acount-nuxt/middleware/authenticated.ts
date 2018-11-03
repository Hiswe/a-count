import { NuxtContext } from '~/types/nuxt'
import { AcountMeta } from '~/types/acount'
import { IS_CONNECTED, ME } from '~/store/user'
import setAxiosTokenFromCookie from '~/helpers/set-axios-token-from-cookie'

const COOKIE_NAME = process.env.COOKIE_NAME

function flattenMeta(acc, meta) {
  return { ...acc, ...meta }
}

export default async function authMiddleware(nuxtContext: NuxtContext) {
  const { app, store, redirect, route, req } = nuxtContext
  const { $axios, $cookies } = nuxtContext.app

  // CONFIGURE AXIOS
  const cookieJWT = setAxiosTokenFromCookie(nuxtContext)
  $axios.onResponse(response => {
    const { data } = response
    if (!data) return
    const { access_token } = data
    if (!access_token) return
    $cookies.set(COOKIE_NAME, access_token)
    setAxiosTokenFromCookie(nuxtContext)
  })

  // ENSURE USER DATA
  let hasUser = store.getters[`user/${IS_CONNECTED}`]
  if (cookieJWT && !hasUser) {
    // populate user if there is a connection cookie
    await store.dispatch(`user/${ME}`)
    hasUser = store.getters[`user/${IS_CONNECTED}`]
  }

  // CHECK AUTHORIZATIONS
  const meta: AcountMeta = route.meta.reduce(flattenMeta, {})
  const { authForbidden, authRequired } = meta
  if (req && req.method === `POST`) {
    console.log({
      authForbidden,
      authRequired,
      user: hasUser,
    })
  }
  if (authForbidden && hasUser) return redirect(`/`)
  if (authRequired && !hasUser) return redirect(`/account/login`)
}
