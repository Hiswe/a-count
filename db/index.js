'use strict'

import chalk from 'chalk'
import { normalize, schema } from 'normalizr'

import sequelize from './db-connection'
import config from '../shared/config'
import { setFakeId } from '../shared/_format'

import Customer from './model-customer'
import Quotation from './model-quotation'

//////
// RELATIONS
//////

Quotation.belongsTo( Customer )

Customer.hasMany( Quotation )


// //////
// // “GLOBAL” METHOD
// //////

// const quotations = new schema.Entity('quotations', { idAttribute:  'id' })
// const invoices   = new schema.Entity('invoices', { idAttribute:    'id' })
// const customers  = new schema.Entity('customers', { idAttribute: '_id' })

// export function getInitialState() {
//   return Promise.resolve( {} )
//   // return viewWithList('general', 'getAll', 'getState')
//   //   .then( initialState => {
//   //     // we don't want raw index to appear on window.__initialState__
//   //     initialState.quotations = initialState.quotations.map( q => setFakeId(q, config) )
//   //     initialState.invoices   = initialState.invoices.map(  i => setFakeId(i, config) )
//   //     // normalize datas for better handling with Redux
//   //     return Promise.resolve(normalize(initialState, {
//   //       quotations: new schema.Array( quotations ),
//   //       invoices:   new schema.Array( invoices ),
//   //       customers:  new schema.Array( customers ),
//   //     }))
//   //   })
// }

//////
// SYNC DATABASE
//////

sequelize
  .sync()
  .then( () => console.log(chalk.green(`[DATABASE] sync – SUCCESS`)) )
  .catch( () => console.log(chalk.red(`[DATABASE] sync – ERROR`)) )

export { sequelize }
