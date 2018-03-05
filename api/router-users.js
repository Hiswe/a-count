import Router from 'koa-router'

import { formatResponse } from './_helpers'
import { normalizeString } from './db/_helpers'
import User from './db/model-user'

const prefix = `users`
const router = new Router({prefix: `/${prefix}`})
export default router

//----- EDIT
.get(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const instance  = await User.findById( id, {
    attributes: {
      exclude: [`password`],
    },
  })
  ctx.assert(instance, 404, `User not found`)
  ctx.body = formatResponse(instance)
})
.post(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const { body }  = ctx.request
  const instance  = await User.findById( id )
  ctx.assert(instance, 404, `Can't find User. The associated user isn't found`)
  const result    = await instance.update( body )
  ctx.body        = formatResponse(result)
})
