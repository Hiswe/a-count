'use strict'

const   chalk        = require( 'chalk'        )
const { inspect    } = require( 'util'         )
const   merge        = require( 'lodash.merge' )
const   Koa          = require( 'koa'          )
const   bodyParser   = require( 'koa-body'     )
const   compress     = require( 'koa-compress' )
const   json         = require( 'koa-json'     )
const   Router       = require( 'koa-router'   )
const   cors         = require( '@koa/cors'    )

require( './db' )
const redis          = require( './redis'            )
const config         = require( './config'           )
const router         = require( './router'           )
const log            = require( './utils/log'        )
const formatResponse = require( './utils/format-response' )

//////
// SERVER CONFIG
//////

const app = new Koa()

app.use( bodyParser() )
app.use( compress() )

// format json https://github.com/koajs/json
app.use( json() )

//----- LOGGING
// • to have better logs: don't use the same logger as server

const colorCodes = {
  7: `magenta`,
  5: `red`,
  4: `yellow`,
  3: `cyan`,
  2: `green`,
  1: `green`,
  0: `yellow`,
}
const time = start => {
  const delta = Date.now() - start
  return delta < 10000
    ? `${ delta }ms`
    : `${ Math.round(delta / 1000) }s`
}
app.use( async (ctx, next) => {
  const { method, path } = ctx.request
  const start = Date.now()
  const logPath = chalk.grey(`api: ${path}`)
  const logMethod = method.toUpperCase()
  log( chalk.grey(`  ==>`), logMethod, logPath  )
  await next()
  const { status } = ctx.response
  const s = status / 100 | 0
  const color = colorCodes.hasOwnProperty(s) ? colorCodes[s] : 0
  log( chalk.grey(`  <==`), logMethod, logPath, chalk[color](status), time(start) )
})

//----- CORS

app.use( cors({
  credentials: true,
}) )

//----- ERRORS

// TODO: send validations errors
// • 400 for input errors: SequelizeValidationError
// • 409 for duplicate errors: SequelizeUniqueConstraintError
// • https://stackoverflow.com/questions/3290182/rest-http-status-codes-for-failed-validation-or-invalid-duplicate
app.use( async function handleApiError(ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.status  = err.statusCode || err.status || 500
    const { status }  = ctx
    const { message } = err
    // only log errors >= 500
    const s = status / 100 | 0
    if (s > 4) {
      console.log( inspect(err, {colors: true}) )
      console.log( inspect(err.original ? err.original : err, {colors: true, depth: 1}) )
    }
    ctx.body = formatResponse({
      error: true,
      status,
      message,
      stacktrace: err.stacktrace || err.stack || false,
    }, ctx)
    ctx.app.emit( 'error', err, ctx )
  }
})

//----- DELAY (dev only)

function waitFor( time ) {
  return new Promise( resolve => setTimeout( () => resolve(), time) )
}

async function delay( ctx, next ) {
  const variation = Math.floor( Math.random() * Math.floor(config.delay.variation) )
  const time = Math.max( 0, config.delay.base + variation - config.delay.variation / 2 )
  log( `waiting start` )
  await waitFor( time )
  log( `waiting end: ${ (time / 1000).toFixed( 2 ) }s`  )
  await next()
}

if ( config.isDev && config.delay ) app.use( delay )

//----- MOUNT ROUTER TO APPLICATION

app.use( router.routes() )

//----- LAUNCH THE MAGIC

const server = app.listen( config.PORT, endInit )

function endInit() {
  log( `API is listening on port`, server.address().port )
}

module.exports = app
