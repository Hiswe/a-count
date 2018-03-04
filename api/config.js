import rc from 'rc'

const config = rc( `concompte-api`, {
  VERSION:  `1.0.0`,
  NAME:     `concompte API`,
  db: {
    log:        false,
    forceSync:  false,
    uri:        `postgres://localhost:5432/concompte`,
  },
  jwt_secret:   `don't speak so loud`,
  businessDefault: {
    currency: `€`,
    tax:      5.5,
    quantity: 0,
    price:    350,
  },
})

config.PORT       = config.PORT || process.env.PORT || 4040

config.NODE_ENV   = config.NODE_ENV || process.env.NODE_ENV || `development`
config.isDev      = config.NODE_ENV === `development`
config.isProd     = config.NODE_ENV === `production`

export { config as default }
