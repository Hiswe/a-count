'use strict'

const Router = require( 'koa-router' )

const { sequelize } = require( './db' )
const { formatResponse } = require( './_helpers' )
const Customer = require( './db/model-customer' )
const Quotation = require( './db/model-quotation' )

const prefix = `customers`
const router = new Router({prefix: `/${prefix}`})
module.exports = router

router
.get(`/`, async (ctx, next) => {
  // const all = await sequelize.query(`
  //   SELECT
  //     *,
  //     ( SELECT COUNT(*)
  //       FROM quotations as quotation
  //       WHERE "quotation"."customerId" = customer.id
  //     ) AS "quotationsCount"
  //   FROM customers AS customer
  // `, { model: Quotation })
  const all = await Customer.findAll()
  ctx.body = formatResponse( all, ctx )
})

//----- NEW
.get(`/new`, async (ctx, next) => {
  const modelTemplate = new Customer().toJSON()
  delete modelTemplate.id
  ctx.body = formatResponse( modelTemplate, ctx )
})
.post(`/new`,  async (ctx, next) => {
  const { body }  = ctx.request
  const instance  = await Customer.updateOrCreate( false, body )
  ctx.body        = formatResponse( instance, ctx )
})

//----- EDIT
.get(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const instance  = await Customer.findOne({
    where: { id },
    include: [{
      model: Quotation,
    }],
  })
  ctx.assert(instance, 404, `Customer not found`)
  ctx.body        = formatResponse( instance, ctx )
})
.post(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const { body }  = ctx.request
  const instance  = await Customer.updateOrCreate( id, body )
  ctx.body        = formatResponse( instance, ctx )
})
