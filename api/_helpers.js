'use strict'

const chalk = require( 'chalk' )
const merge = require( 'lodash.merge' )
const { debuglog } = require( 'util' )

const DefaultQuotation = require( './db/model-default-quotation' )
const DefaultInvoice = require( './db/model-default-invoice' )
const DefaultProduct = require( './db/model-default-product' )

const log = debuglog( `api` )

const getDefaultUserParams = ( params = {} ) => {
  return merge({
    where: {
      isDeactivated:  { $not: true },
    },
    attributes: {
      exclude: [`token`, `tokenExpire`, `createdAt`, `updatedAt`],
    },
    include: [{
      model: DefaultQuotation,
    }, {
      model: DefaultInvoice,
    }, {
      model: DefaultProduct,
    }]
  }, params )
}

const removePassword = user => {
  user = typeof user.toJSON === `function` ? user.toJSON() : user
  delete user.password
  return user
}

module.exports = {
  log,
  getDefaultUserParams,
  removePassword,
}
