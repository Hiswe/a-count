'use strict'

const redbird = require( 'redbird' )
const proxy   = redbird({
  port: 4080,
  ssl: {
    port: 4443,
    key : `./certs/dev-key.pem`,
    cert: `./certs/dev-cert.pem`,
  },
  // disable log
  bunyan: false,
})

proxy.register( `localhost`, `http://localhost:4040`, {ssl: true} )

console.log(`————————————————————————————————————
  API PROXY
     http:  http://localhost:4080
    https:  https://localhost:4443
————————————————————————————————————`)
