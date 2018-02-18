import chalk from 'chalk'
import { normalize, schema } from 'normalizr'

import sequelize from './db-connection'

import Customer from './model-customer'
import Quotation from './model-quotation'

//////
// RELATIONS
//////

Quotation.belongsTo( Customer )
Customer.hasMany( Quotation )

//////
// SYNC DATABASE
//////

sequelize
  .sync()
  .then( () => console.log(chalk.green(`[DATABASE] sync – SUCCESS`)) )
  .catch( () => console.log(chalk.red(`[DATABASE] sync – ERROR`)) )

export { sequelize }
