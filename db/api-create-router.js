import Router from 'koa-router'

import { formatResponse } from './api-helpers'

const create = (prefix, Model) => {
  const router = new Router({prefix: `/${prefix}`})

  router
  .get(`/`, async (ctx, next) => {
    const all = await Model.findAll()
    ctx.body = formatResponse(all)
  })

  //----- NEW
  .get(`/new`, async (ctx, next) => {
    const modelTemplate = new Model().toJSON()
    delete modelTemplate.id
    // Object
    // .entries( modelTemplate)
    // .forEach( ([key, value]) => {
    //   if (value.defaultValue !== null) {
    //     return blankModel[ key ] = value.defaultValue
    //   }
    //   if (value.type === `TEXT` || value.type === `CHARACTER VARYING(255)` ) {
    //     blankModel[ key ] = ``
    //   }
    // })
    ctx.body = formatResponse(modelTemplate)
  })
  .post(`/new`,  async (ctx, next) => {
    const { body }  = ctx.request
    const instance  = await Model.updateOrCreate( false, body )
    ctx.body        = formatResponse(instance)
  })

  //----- EDIT
  .get(`/:id`, async (ctx, next) => {
    const { id }    = ctx.params
    const instance  = await Model.findById( id )
    ctx.body        = formatResponse(instance)
  })
  .post(`/:id`, async (ctx, next) => {
    const { id }    = ctx.params
    const { body }  = ctx.request
    const instance  = await Model.updateOrCreate( id, body )
    ctx.body        = formatResponse(instance)
  })

  return router

}

export { create as default }
