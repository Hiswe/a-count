const rc = require( 'rc' )

const config = rc( `concompte-api`, {
  VERSION:  `1.0.0`,
  NAME:     `concompte API`,
  db: {
    forceSync:  false,
    uri:        `postgres://localhost:5432/concompte`,
  },
  redis: {
    port: 6379,
    host: `127.0.0.1`,
  },
  // To generate a new secret:
  // node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
  jwt_secret: `49e3bd8b1935f3d17ce23146eb602fdb321e5b4f41eb7dd7f898e61426970086`,
  session: {
    key: 'session:api-concompte',
    maxAge: 86400000,
    renew: true,
  },
})

config.PORT       = config.PORT || process.env.PORT || 4040

config.NODE_ENV   = config.NODE_ENV || process.env.NODE_ENV || `development`
config.isDev      = config.NODE_ENV === `development`
config.isProd     = config.NODE_ENV === `production`

module.exports = config
