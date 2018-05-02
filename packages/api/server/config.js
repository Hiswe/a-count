'use strict'

const rc = require( 'rc' )

const pkg = require( '../package.json' )

const config = rc( `acountApi`, {
  NAME:         `a-count API`,
  db: {
    forceSync:  false,
    url:        `postgres://localhost:5432/a-count`,
  },
  redis:        {
    url:        `redis://localhost:6379`,
  },
  email: {
    transport: {
      host: `localhost`,
      port: 1025,
    },
    // "provider": {
    //   "provider": "GandiMail",
    //   "auth": {
    //     "user": "####",
    //     "pass": "####",
    //   }
    // },
    options: {
      from: `A-Count <api@a-count.name>`,
    }
  },
  delay: false,
  // delay: {
  //   base     : 1000,
  //   variation: 500,
  // },
  jwt: {
    secret     : `49e3bd8b1935f3d17ce23146eb602fdb321e5b4f41eb7dd7f898e61426970086`,
    expiresIn  : `1 days` ,
    cookieName : `a-count_api` ,
  },
  enforceHttps : false,
})

config.VERSION    = pkg.version

config.PORT       = config.PORT || process.env.PORT || 4040

config.NODE_ENV   = config.NODE_ENV || process.env.NODE_ENV || `development`
config.isDev      = config.NODE_ENV === `development`
config.isProd     = config.NODE_ENV === `production`

// Don't want that to happen in production
if ( config.isProd ) {
  // This can ruin the database!
  config.db.forceSync = false
  // Want the prod version to be as fast as possible
  config.delay = false
}

module.exports = config
