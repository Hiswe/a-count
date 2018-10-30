import rc from 'rc'

import { ServerConfiguration } from '../types/acount'

const config: ServerConfiguration = rc(`acount-nuxt`, {
  API_URL: `http://127.0.0.1:4040/v1`,
  COOKIE_NAME: `a-count_webapp`,
  HOST_URL: `http://localhost:3000`,
  // enforceHttps will be passed to
  // • https://www.npmjs.com/package/koa-sslify
  enforceHttps: false,
})

config.HOST = process.env.HOST || `0.0.0.0`
config.PORT = Number(config.PORT) || Number(process.env.PORT) || 3000

config.NODE_ENV = config.NODE_ENV || process.env.NODE_ENV || `development`
config.isDev = config.NODE_ENV === `development`
config.isProd = config.NODE_ENV === `production`

export { config as default }
