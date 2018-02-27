import Router from 'koa-router'

import { sequelize } from './db'
import { formatResponse } from './_helpers'
import Customer from './db/model-customer'
import Quotation from './db/model-quotation'
import QuotationCount from './db/model-quotation-count'

const prefix = `customers`
const router = new Router({prefix: `/${prefix}`})
export default router

router
.get(`/`, async (ctx, next) => {
  // didn't achieve to use only sequelize API
  const all = await sequelize.query(`
    SELECT
      *,
      ( SELECT COUNT(*)
        FROM quotations as quotation
        WHERE "quotation"."customerId" = customer.id
      ) AS "quotationsCount"
    FROM customers AS customer
  `, { model: Quotation })
  ctx.body = formatResponse(all)
})

//----- NEW
.get(`/new`, async (ctx, next) => {
  const modelTemplate = new Customer().toJSON()
  delete modelTemplate.id
  ctx.body = formatResponse(modelTemplate)
})
.post(`/new`,  async (ctx, next) => {
  const { body }  = ctx.request
  const instance  = await Customer.updateOrCreate( false, body )
  ctx.body        = formatResponse(instance)
})

//----- EDIT
.get(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const instance  = await Customer.findOne({
    where: { id },
    include: [{
      model: Quotation,
      include: [{
        model: QuotationCount,
        attributes: [`count`],
      }]
    }],
  })
  ctx.assert(instance, 404, `Customer not found`)
  ctx.body        = formatResponse(instance)
})
.post(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const { body }  = ctx.request
  const instance  = await Customer.updateOrCreate( id, body )
  ctx.body        = formatResponse(instance)
})
