import Sequelize, { Op } from 'sequelize'

import config from  '../config'

let logging     = () => {}

if ( config.db.log ) {
  const formattor = require( 'formattor' )
  logging = query => console.log( formattor(query, {method: 'sql'}) )
}

const operatorsAliases = {}

// Aliases all operators to the equivalent Symbols
// see comment on the new connection
Object
.entries( Op )
.forEach( ([key, value]) => {
  operatorsAliases[ `$${key}` ] = value
})

const sequelize = new Sequelize( config.db.uri, {
  logging,
  // remove sequelize deprecation warnings
  // https://github.com/sequelize/sequelize/issues/8417#issuecomment-341617577
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
  operatorsAliases,
})

export { sequelize as default }
