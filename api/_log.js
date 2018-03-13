'use strict'

const { debuglog } = require( 'util' )
const chalk = require( 'chalk' )

const log = debuglog( `api` )
log( chalk.green(`init logging`) )

module.exports = debuglog( `api` )
