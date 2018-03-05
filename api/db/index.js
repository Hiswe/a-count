import chalk from 'chalk'
import { inspect } from 'util'
import { normalize, schema } from 'normalizr'

import sequelize from './connection'

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

// TODO: better error logging
// sequelize
// .authenticate()
// .then( () => {
//   console.log(chalk.green('[DB] setup is done'))
//   return sequelize
//   .sync()
//   .then( () => { console.log(chalk.green('[DB] sync is done')) } )
//   .catch( err => {
//     console.log( chalk.red('[DB] sync FAIL') )
//     console.log( inspect(err, {colors: true}) )
//   })
// })
// .catch( err => {
//     console.log(chalk.red('[DB] setup FAIL'))
//     console.log( inspect(err, {colors: true}) )
//     dbStatus = err
//     if (err.code !== 'ECONNREFUSED') return console.log(err)
//     console.log(chalk.yellow('db is not acessible\nlaunch it for god sake'))
// })

sequelize
  .sync({force: config.db.forceSync})
  .then( () => console.log(chalk.green(`[DATABASE] sync – SUCCESS`)) )
  .catch( err => {
    console.log(chalk.red(`[DATABASE] sync – ERROR`))
    console.log( inspect(err, {colors: true}) )
  })

export { sequelize }