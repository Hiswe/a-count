'use strict'

const merge = require( 'lodash.merge' )
const Router = require( 'koa-router' )

const { formatResponse } = require( './_helpers' )
const { normalizeString } = require( './db/_helpers' )
const User = require( './db/model-user' )
const DefaultQuotation = require( './db/model-default-quotation' )
const DefaultInvoice = require( './db/model-default-invoice' )
const DefaultProduct = require( './db/model-default-product' )

const prefix = `users`
const router = new Router({prefix: `/${prefix}`})
module.exports = router

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
  ctx.body = formatResponse( instance, ctx )
})
.post(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const { body }  = ctx.request
  const instance  = await User.findById( id )
  ctx.assert(instance, 404, `Can't find User. The associated user isn't found`)
  const result    = await instance.update( body )
  ctx.body        = formatResponse( result, ctx )
})
