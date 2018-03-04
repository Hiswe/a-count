import { inspect } from 'util'
import moment from 'moment'
import Router from 'koa-router'
import jwt from 'koa-jwt'
import jsonwebtoken from 'jsonwebtoken'
import omit from 'lodash.omit'

import { formatResponse } from './_helpers'
import routerUsers from './router-users'
import routerCustomers from './router-customers'
import routerQuotations from './router-quotations'
import config from './config'
import User from './db/model-user'
import { normalizeString } from './db/_helpers'

const apiRouter = new Router({
  // TODO: should have a prefix
  // prefix: `/v1`,
})

//----- ERRORS

apiRouter.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log( inspect(err.original ? err.original : err, {colors: true, depth: 1}) )
    ctx.status  = err.statusCode || err.status || 500
    const { status }  = ctx
    const { message } = err
    ctx.body    = Object.assign(
      formatResponse({
        error: true,
        status,
        message,
      }), {
      message,
      stacktrace: err.stacktrace || err.stack || false,
    })
  }
})

//----- SESSIONS

apiRouter.use( jwt({
  secret: config.jwt_secret,
}).unless({
  path: [
    `/login`,
    `/logout`,
    `/register`,
    `/`,
  ]
}) )

apiRouter.post(`/register`,  async (ctx, next) => {
  const { body }  = ctx.request
  const user      = await User.create( body )
  ctx.body        = formatResponse(user)
})

apiRouter.post(`/login`,  async (ctx, next) => {
  const { body }  = ctx.request
  const user      = await User.findOne({
    where: { email: normalizeString( body.email ), }
  })
  ctx.assert( user, 404, `User not found` )

  const isPasswordValid = await user.comparePassword( body.password )
  ctx.assert( user, 401, `Invalid password` )

  // https://github.com/clintmod/koa-jwt-login-example/blob/master/src/app.js
  const userWithoutPassword = omit( user.get({plain: true}), [`password`] )
  const token = jsonwebtoken.sign({
    data: userWithoutPassword,
    // // exp in seconds
    // // TODO: use moment.js
    // exp: Math.floor(Date.now() / 1000) - (60 * 60) // 60 seconds * 60 minutes = 1 hour
  }, config.jwt_secret)
  ctx.body = Object.assign( formatResponse(), {token} )
})

//----- API INFOS

apiRouter
.get( `/`, (ctx, next) => {
  ctx.body = formatResponse()
})

//----- MOUNT

apiRouter.use( routerUsers.routes() )
apiRouter.use( routerCustomers.routes() )
apiRouter.use( routerQuotations.routes() )

export default apiRouter
