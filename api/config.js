import rc from 'rc'

const config = rc( `concompte-api`, {
  db: {
    log: false,
    uri: `postgres://localhost:5432/concompte`,
  },
  VERSION:  `1.0.0`,
  NAME:     `concompte API`,
})

config.PORT       = config.PORT || process.env.PORT || 4040

config.NODE_ENV   = config.NODE_ENV || process.env.NODE_ENV || `development`
config.isDev      = config.NODE_ENV === `development`
config.isProd     = config.NODE_ENV === `production`

export { config as default }
