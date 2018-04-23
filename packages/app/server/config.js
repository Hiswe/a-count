
import rc from 'rc'

const config      = rc( `a-count`, {
  API_URL:          `http://localhost:4040/v1`,
  API_COOKIE_NAME:  `a-count_api`,
  HOST_URL:         `http://localhost:3000`,
  APP_NAME:         `a-count`,
})

config.PORT       = config.PORT || process.env.PORT || 3000

config.NODE_ENV   = config.NODE_ENV || process.env.NODE_ENV || `development`
config.isDev      = config.NODE_ENV === `development`
config.isProd     = config.NODE_ENV === `production`

export { config as default }
