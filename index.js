'use strict'

const { inspect } = require( 'util' )

require('babel-core/register')({
  presets: ['es2015', 'react'],
  ignore: function(filename) {
    if (/node_module/.test(filename)) return true;
    return /design-/.test(filename);
  },
})

const config  = require('./shared/config').default

if ( config.isDev ) {
  console.log( `listening to unhandledRejection` )
  process.on( `unhandledRejection`, (reason, p) => {
    console.log( `Unhandled Promise Rejection with reason:`, reason)
    console.log( inspect(p.stack, {colors: true}) )
  })
}

const app     = require( `./server/index.js` ).default

const server = app.listen(config.PORT, function endInit() {
  console.log('Server is listening on port', server.address().port)
})



