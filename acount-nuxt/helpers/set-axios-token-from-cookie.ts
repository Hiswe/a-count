import { NuxtContext } from '~/types/nuxt'

const COOKIE_NAME = process.env.COOKIE_NAME
const JWT_FORMAT = process.env.JWT_FORMAT

export default (nuxtContext: NuxtContext) => {
  const { $axios, $cookies } = nuxtContext.app
  const cookieJWT = $cookies.get(COOKIE_NAME)
  if (cookieJWT) {
    $axios.setToken(cookieJWT, JWT_FORMAT)
  }
  return cookieJWT
}
