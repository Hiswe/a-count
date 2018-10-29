import { NuxtContext } from '../types/nuxt'
import { AcountMeta } from '../types/acount'
import { ME } from '../store/user'

// can't destructuring process.env
const COOKIE_NAME = process.env.COOKIE_NAME
const JWT_FORMAT = `Bearer`

export default async function axiosJWT(nuxtContext: NuxtContext) {
  const { app, req, store } = nuxtContext
  const { $axios, $cookies } = app
  const cookieJWT = $cookies.get(COOKIE_NAME)
  if (cookieJWT) $axios.setToken(cookieJWT, JWT_FORMAT)

  $axios.onResponse(response => {
    const { data } = response
    if (!data) return
    const { access_token } = data
    if (!access_token) return
    $cookies.set(COOKIE_NAME, access_token)
    $axios.setToken(access_token, JWT_FORMAT)
  })

  await store.dispatch(`user/${ME}`, req.body)
}
