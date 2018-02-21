import chalk from 'chalk'
import { normalize, schema } from 'normalizr'

import sequelize from './db-connection'

import config from  '../config'
import Customer from './model-customer'
import Quotation from './model-quotation'
import QuotationCount from './model-quotation-count'

//////
// RELATIONS
//////

Quotation.belongsTo( Customer )
Quotation.hasOne( QuotationCount )

QuotationCount.belongsTo( Quotation )

Customer.hasMany( Quotation )

//////
// SYNC DATABASE
//////

sequelize
  .sync({force: config.db.forceSync})
  .then( () => console.log(chalk.green(`[DATABASE] sync – SUCCESS`)) )
  .catch( () => console.log(chalk.red(`[DATABASE] sync – ERROR`)) )

export { sequelize }
