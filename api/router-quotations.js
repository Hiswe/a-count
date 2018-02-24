import Router from 'koa-router'

import { formatResponse } from './helpers'
import { normalizeString } from './db/helpers'
import Customer from './db/model-customer'
import Quotation from './db/model-quotation'
import QuotationCount from './db/model-quotation-count'

const prefix = `quotations`
const router = new Router({prefix: `/${prefix}`})
export default router

//////
// UTILITIES
//////

const getUserByName = async (body) => {
  const customerName = normalizeString(body[`customerName`])
  let customer = await Customer.findOne( {
    where: {name: customerName},
  })
  if (!customer) {
    customer = new Customer({ name: customerName})
    await customer.save()
  }
  return customer
}

//////
// ROUTES
//////

router
.get(`/`, async (ctx, next) => {
  const all = await Quotation.findAll({
    include: [{
      model: Customer,
      attributes: [`id`, `name`, `address`],
    }, {
      model: QuotationCount,
      attributes: [`count`]
    }],
  })
  ctx.body = formatResponse(all)
})

//----- NEW
.get(`/new`, async (ctx, next) => {
  const modelTemplate = new Quotation().toJSON()
  delete modelTemplate.id
  ctx.body = formatResponse(modelTemplate)
})
.post(`/new`,  async (ctx, next) => {
  const { body }      = ctx.request
  // TODO check if customer exist!
  // const customer      = await getUserByName(body)
  // body.customerId = customer.get(`id`)
  const instance  = await Quotation.updateOrCreate( false, body )
  ctx.body        = formatResponse(instance)
})

//----- EDIT
.get(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const instance  = await Quotation.findOne( {
    where: { id,},
    include: [{
      model: Customer,
      attributes: [`id`, `name`, `address`],
    }, {
      model: QuotationCount,
      attributes: [`count`]
    }],
  })
  ctx.assert(instance, 404, `Quotation not found`)
  ctx.body = formatResponse(instance)
})
.post(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const { body }  = ctx.request

  // const customer  = await getUserByName(body)
  // body.customerId = customer.get(`id`)
  const instance  = await Quotation.updateOrCreate( id, body )
  ctx.body        = formatResponse(instance)
})
