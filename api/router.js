const { inspect } = require( 'util' )
const omit = require( 'lodash.omit' )
const merge = require( 'lodash.merge' )
const moment = require( 'moment' )
const Router = require( 'koa-router' )

const redis = require( './redis' )
const { formatResponse } = require( './_helpers' )
const routerUsers = require( './router-users' )
const routerCustomers = require( './router-customers' )
const routerQuotations = require( './router-quotations' )
const config = require( './config' )
const User = require( './db/model-user' )
const { normalizeString } = require( './db/_helpers' )

const apiRouter = new Router({
  // TODO: should have a prefix
  // prefix: `/v1`,
})
module.exports = apiRouter

//----- ERRORS

apiRouter.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log( inspect(err.original ? err.original : err, {colors: true, depth: 1}) )
    ctx.status  = err.statusCode || err.status || 500
    const { status }  = ctx
    const { message } = err
    ctx.body = formatResponse({
      error: true,
      status,
      message,
      stacktrace: err.stacktrace || err.stack || false,
    })
  }
})

//----- API INFOS

apiRouter
.get( `/`, (ctx, next) => {
  console.log( ctx.session )
  ctx.body = formatResponse()
})

//----- AUTHENTICATION

apiRouter.post(`/register`, async (ctx, next) => {
  const { body }  = ctx.request
  const user      = await User.create( body )
  ctx.body        = formatResponse(user)
})

apiRouter.post(`/login`, async (ctx, next) => {
  const { body }  = ctx.request
  const user      = await User.findOne({
    where: { email: normalizeString( body.email ), }
  })
  ctx.assert( user, 404, `User not found` )

  const isPasswordValid = await user.comparePassword( body.password )
  ctx.assert( user, 401, `Invalid password` )

  // https://github.com/clintmod/koa-jwt-login-example/blob/master/src/app.js
  const userWithoutPassword = omit( user.get({plain: true}), [`password`] )
  ctx.session.user = userWithoutPassword
  ctx.body = formatResponse( {message: `connected as ${userWithoutPassword.email}`} )
})

apiRouter.get(`/logout`, async (ctx, next) => {
  ctx.session = null
  ctx.body = formatResponse({ message: `bye bye` })
})

apiRouter.use( async (ctx, next) => {
  // console.log( `PROTECTED ROUTE` )
  // console.log( ctx.session )
  ctx.assert( ctx.session && ctx.session.user, 401, `Not connected` )
  // console.log( `OK` )
  await next()
})

//----- MOUNT

apiRouter.use( routerUsers.routes() )
apiRouter.use( routerCustomers.routes() )
apiRouter.use( routerQuotations.routes() )
