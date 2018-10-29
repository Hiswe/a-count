import { NuxtContext } from '../types/nuxt'
import { AcountMeta } from '../types/acount'

const COOKIE_NAME = `acount_nuxt`

export default async function axiosJWT(nuxtContext: NuxtContext) {
  const { app, req } = nuxtContext
  const { $axios, $cookies } = app
  $axios.onResponse(response => {
    const { data } = response
    if (!data) return
    const { access_token } = data
    if (!access_token) return
    $cookies.set(COOKIE_NAME, access_token)
    $axios.setToken(access_token)
  })
}
