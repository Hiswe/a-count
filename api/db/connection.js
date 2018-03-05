import { debuglog } from 'util'
import Sequelize, { Op } from 'sequelize'
import formattor from 'formattor'

import config from  '../config'

const log = debuglog( `db` )

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

export { sequelize as default }
