import { NuxtContext } from '~/types/nuxt'
import setAxiosTokenFromCookie from '~/helpers/set-axios-token-from-cookie'

const COOKIE_NAME = process.env.COOKIE_NAME
const JWT_FORMAT = process.env.JWT_FORMAT

// set again axios token on the client side
export default async (nuxtContext: NuxtContext) => {
  setAxiosTokenFromCookie(nuxtContext)
}
