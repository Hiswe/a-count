'use strict'

const redbird = require( 'redbird' )
const proxy   = redbird({
  port: 3080,
  // Specify filenames to default SSL certificates (in case SNI is not supported by the
  // user's browser)
  ssl: {
    port: 3443,
    key : `certs/dev-key.pem`,
    cert: `certs/dev-cert.pem`,
  },
})

// Since we will only have one https host, we dont need to specify additional certificates.
proxy.register( `localhost`, `http://localhost:3000`, {ssl: true} )
