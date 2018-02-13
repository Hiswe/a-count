import Router from 'koa-router'
import chalk from 'chalk'
import { inspect } from 'util'

import Customer from './model-customer'

const router  = new Router()
const version = `1.0.0`
const name    = `concompte API`

const formatResponse = (payload = {}) => ({
  version,
  name,
  payload,
})

//////
// ERRORS
//////

router.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log( inspect(err, {colors: true, depth: 1}) )
    ctx.status  = err.statusCode || err.status || 500
    ctx.body    = Object.assign(formatResponse(), {
      message:    err.message,
      stacktrace: err.stacktrace || err.stack || false,
    })
  }
})

//////
// INFOS
//////

router
.get( `/`, (ctx, next) => {
  ctx.body = formatResponse()
})

//////
// CUSTOMERS
//////

const customersRoutes = new Router({prefix: `/customers`})

customersRoutes
.get(`/`, async (ctx, next) => {
  const customers = await Customer.findAll()
  ctx.body = formatResponse(customers)
})

//----- NEW
.get(`/new`, async (ctx, next) => {
  const customerTemplate = await Customer.describe()
  const blankCustomer = {}
  Object
  .entries( customerTemplate)
  .forEach( ([key, value]) => {
    if (value.defaultValue !== null) {
      return blankCustomer[ key ] = value.defaultValue
    }
    if (value.type === `TEXT` || value.type === `CHARACTER VARYING(255)` ) {
      blankCustomer[ key ] = ``
    }
  })
  ctx.body = formatResponse(blankCustomer)
})
.post(`/new`,  async (ctx, next) => {
  const { body }  = ctx.request
  const customer  = await Customer.updateOrCreate( false, body )
  ctx.body        = formatResponse(customer)
})

//----- EDIT
.get(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const customer  = await Customer.findById( id )
  ctx.body        = formatResponse(customer)
})
.post(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const { body }  = ctx.request
  const customer  = await Customer.updateOrCreate( id, body )
  ctx.body        = formatResponse(customer)
})

router
  .use( customersRoutes.routes() )

export { router as default }
