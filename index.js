'use strict'

const { inspect } = require( 'util' )

require('babel-core/register')({
  presets: ['es2015', 'react'],
  ignore: (filename) => {
    if (/node_module/.test(filename)) return true
    return false
  },
})

const appConfig  = require('./shared/config').default
const apiConfig  = require('./api/config').default

if ( appConfig.isDev ) {
  console.log( `listening to unhandledRejection` )
  process.on( `unhandledRejection`, (reason, p) => {
    console.log( `Unhandled Promise Rejection with reason:`, reason)
    console.log( inspect(p.stack, {colors: true}) )
  })
}

const app = require( `./server/index.js` ).default
const api = require( `./api/index.js` ).default

const appServer = app.listen(appConfig.PORT, function endInit() {
  console.log('Server is listening on port', appServer.address().port)
})

const apiServer = api.listen(apiConfig.PORT, function endInit() {
  console.log('Server is listening on port', apiServer.address().port)
})
