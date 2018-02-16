import Router from 'koa-router'

import { formatResponse } from './helpers'
import Customer from './db/model-customer'
import Quotation from './db/model-quotation'


const prefix = `quotations`
const router = new Router({prefix: `/${prefix}`})
export default router

router
.get(`/`, async (ctx, next) => {
  const all = await Quotation.findAll()
  ctx.body = formatResponse(all)

})
//----- NEW
.get(`/new`, async (ctx, next) => {
  const modelTemplate = new Quotation().toJSON()
  delete modelTemplate.id
  ctx.body = formatResponse(modelTemplate)
})
.post(`/new`,  async (ctx, next) => {
  const { body }  = ctx.request
  const instance  = await Quotation.updateOrCreate( false, body )
  ctx.body        = formatResponse(instance)
})

//----- EDIT
.get(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const instance  = await Quotation.findById( id )
  ctx.body        = formatResponse(instance)
})
.post(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const { body }  = ctx.request
  const instance  = await Quotation.updateOrCreate( id, body )
  ctx.body        = formatResponse(instance)
})

