'use strict'

const { debuglog } = require( 'util' )
const Sequelize = require( 'sequelize' )
const formattor = require( 'formattor' )

const config = require(  '../config' )

const log = debuglog( `api:db:query` )
const { Op } = Sequelize

// Aliases all operators to the equivalent Symbols
// see comment on the new connection
const operatorsAliases = {}
Object
.entries( Op )
.forEach( ([key, value]) => {
  operatorsAliases[ `$${key}` ] = value
})

const sequelize = new Sequelize( config.db.uri, {
  logging: query => log( formattor(query, {method: 'sql'}) ),
  // remove sequelize deprecation warnings
  // https://github.com/sequelize/sequelize/issues/8417#issuecomment-341617577
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
  operatorsAliases,
})

module.exports = sequelize
