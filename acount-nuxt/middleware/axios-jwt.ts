import { NuxtContext } from '../types/nuxt'
import { AcountMeta } from '../types/acount'

export default async function axiosJWT(nuxtContext: NuxtContext) {
  const { app } = nuxtContext
  app.$axios.onResponse(response => {
    const { data } = response
    if (!data) return
    const { access_token } = data
    if (!access_token) return
    console.log('ACCESS_TOKEN')
    console.log(access_token)
  })
}
