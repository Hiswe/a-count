'use strict'

const redbird = require( 'redbird' )
const proxy   = redbird({
  port: 3080,
  ssl: {
    port: 3443,
    key : `certs/dev-key.pem`,
    cert: `certs/dev-cert.pem`,
  },
  // disable log
  bunyan: false,
})

proxy.register( `localhost`, `http://localhost:3000`, {ssl: true} )

console.log(`————————————————————————————————————
  APPLICATION PROXY
     http:  http://localhost:3080
    https:  https://localhost:3443
————————————————————————————————————`)
