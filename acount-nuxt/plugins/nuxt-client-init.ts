import { NuxtContext } from '~/types/nuxt'

const COOKIE_NAME = process.env.COOKIE_NAME
const JWT_FORMAT = process.env.JWT_FORMAT

// set again axios token on the client side
export default async (nuxtContext: NuxtContext) => {
  const { app } = nuxtContext
  const { $axios, $cookies } = app
  const cookieJWT = $cookies.get(COOKIE_NAME)
  if (cookieJWT) {
    $axios.setToken(cookieJWT, JWT_FORMAT)
  }
}
