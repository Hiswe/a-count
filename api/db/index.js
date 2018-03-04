import chalk from 'chalk'
import { inspect } from 'util'
import { normalize, schema } from 'normalizr'

import sequelize from './db-connection'

import config from  '../config'
import Customer from './model-customer'
import Quotation from './model-quotation'
import User from './model-user'

//////
// RELATIONS
//////

Quotation.belongsTo( Customer )
Quotation.belongsTo( User )

Customer.hasMany( Quotation )
Customer.belongsTo( User )

User.hasMany( Customer )
User.hasMany( Quotation )

//////
// SYNC DATABASE
//////

sequelize
  .sync({force: config.db.forceSync})
  .then( () => console.log(chalk.green(`[DATABASE] sync – SUCCESS`)) )
  .catch( err => {
    console.log(chalk.red(`[DATABASE] sync – ERROR`))
    console.log( inspect(err, {colors: true}) )
  })

export { sequelize }
