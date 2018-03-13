'use strict'

const Router = require( 'koa-router' )

const { sequelize } = require( './db' )
const formatResponse = require( './_format-response' )
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
  const list = await Customer.findAll()
  // put response in a list key
  // • we will add pagination information later
  ctx.body = formatResponse( {list} )
})

//----- NEW

.get(`/new`, async (ctx, next) => {
  const modelTemplate = new Customer().toJSON()
  delete modelTemplate.id
  ctx.body = formatResponse( modelTemplate )
})
.post(`/new`,  async (ctx, next) => {
  const { body }  = ctx.request
  // TODO: check if the user doesn't already have a customer with the same name
  body.userId     = ctx.session.user.id
  const customer  = await Customer.create( body )
  ctx.body        = formatResponse( customer )
})

//----- EDIT

.get(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const instance  = await Customer.findOne({
    where: { id },
    // include: [{
    //   model: Quotation,
    // }],
  })
  ctx.assert(instance, 404, `Customer not found`)
  ctx.body        = formatResponse( instance )
})
.post(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const { body }  = ctx.request
  const instance  = await Customer.findOne( {where: { id }} )
  // TODO: check if the user doesn't already have a customer with the same name
  ctx.assert(instance, 404, `Customer not found`)
  const result    = await instance.update( body )
  ctx.body        = formatResponse( result )
})
