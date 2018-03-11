'use strict'

const merge = require( 'lodash.merge' )
const Router = require( 'koa-router' )

const helpers = require( './_helpers' )
const formatResponse = require( './_format-response' )
const User = require( './db/model-user' )
const DefaultQuotation = require( './db/model-default-quotation' )
const DefaultInvoice = require( './db/model-default-invoice' )
const DefaultProduct = require( './db/model-default-product' )

const prefix = `users`
const router = new Router({prefix: `/${prefix}`})
module.exports = router

const getUserParams = {
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
}

router

//----- EDIT

.get(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const instance  = await User.findById( id, {
    attributes: {
      exclude: [`password`],
    },
  })
  ctx.assert(instance, 404, `User not found`)
  ctx.body = formatResponse( instance )
})
.post(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const { body }  = ctx.request
  const instance  = await User.findById( id )

  ctx.assert(instance, 404, `Can't find User. The associated user isn't found`)

  const updated   = await instance.update( body )

  const params = helpers.getDefaultUserParams( { where: {id: updated.id} } )
  const user = await User.findOne( params )

  const userWithoutPassword = helpers.removePassword( user )
  ctx.session.user = userWithoutPassword
  ctx.body        = formatResponse( userWithoutPassword )
})
