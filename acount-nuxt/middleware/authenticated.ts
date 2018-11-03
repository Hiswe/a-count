import { NuxtContext } from '~/types/nuxt'
import { AcountMeta } from '~/types/acount'
import { IS_CONNECTED, ME } from '~/store/user'

const COOKIE_NAME = process.env.COOKIE_NAME
const JWT_FORMAT = process.env.JWT_FORMAT

function flattenMeta(acc, meta) {
  return { ...acc, ...meta }
}

export default async function authMiddleware(nuxtContext: NuxtContext) {
  const { app, store, redirect, route, req } = nuxtContext

  // CONFIGURE AXIOS
  const { $axios, $cookies } = app
  const cookieJWT = $cookies.get(COOKIE_NAME)
  if (cookieJWT) {
    $axios.setToken(cookieJWT, JWT_FORMAT)
  }
  $axios.onResponse(response => {
    const { data } = response
    if (!data) return
    const { access_token } = data
    if (!access_token) return
    $cookies.set(COOKIE_NAME, access_token)
    $axios.setToken(access_token, JWT_FORMAT)
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
