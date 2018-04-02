'use strict'

const merge  = require( 'lodash.merge' )
const Router = require( 'koa-router'   )

const formatResponse   = require( './utils/format-response'      )
const User             = require( './db/model-user'              )

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
  ctx.body = formatResponse( instance )
})
.post(`/:id`, async (ctx, next) => {
  const { id }    = ctx.params
  const { body }  = ctx.request
  const instance  = await User.findOneWithRelations({
    where: {id}
  })

  ctx.assert(instance, 404, `Can't find User. The associated user isn't found`)

  const updated   = await instance.update( body )

  const relations = [`defaultQuotation`, `defaultInvoice`, `defaultProduct`]
  await Promise.all( relations.map( relationName => {
    return instance[ relationName ].update( body[ relationName ] )
  }))

  const user      = await User.findOneWithRelations({
    where: {id: updated.id}
  })

  const result      = formatResponse( { user } )
  ctx.state.user    = result
  ctx.body          = result
})
