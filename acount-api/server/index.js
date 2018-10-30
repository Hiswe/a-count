'use strict'

const chalk = require('chalk')
const { inspect } = require('util')
const merge = require('lodash.merge')
const Koa = require('koa')
const bodyParser = require('koa-body')
const compress = require('koa-compress')
const json = require('koa-json')
const Router = require('koa-router')
const cors = require('@koa/cors')
const enforceHttps = require('koa-sslify')
const helmet = require('koa-helmet')

require('./db')
const redis = require('./redis')
const config = require('./config')
const routerV1 = require('./router-v1')
const log = require('./utils/log')
const routers = [require('./router-v1'), require('./router-v1-1')]

//////
// SERVER CONFIG
//////

const app = new Koa()

app.use(helmet())
app.use(bodyParser())
app.use(compress())
app.use(json())

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
  return delta < 10000 ? `${delta}ms` : `${Math.round(delta / 1000)}s`
}
app.use(async (ctx, next) => {
  const { method, path, search } = ctx.request
  const start = Date.now()
  const logPath = chalk.grey(`api: ${path}${search}`)
  const logMethod = method.toUpperCase()
  log.api(chalk.grey(`  ==>`), logMethod, logPath)
  await next()
  const { status } = ctx.response
  const s = (status / 100) | 0
  const color = colorCodes.hasOwnProperty(s) ? colorCodes[s] : 0
  log.api(
    chalk.grey(`  <==`),
    logMethod,
    logPath,
    chalk[color](status),
    time(start),
  )
})

//----- CORS

app.use(
  cors({
    credentials: true,
  }),
)

//----- HTTPS REDIRECT

if (config.enforceHttps) app.use(enforceHttps(config.enforceHttps))

//----- ERRORS

// TODO: send validations errors
// • 400 for input errors: SequelizeValidationError
// • 409 for duplicate errors: SequelizeUniqueConstraintError
// • https://stackoverflow.com/questions/3290182/rest-http-status-codes-for-failed-validation-or-invalid-duplicate
app.use(async function handleApiError(ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    const { status } = ctx
    const { message } = err
    // only log errors >= 500
    const s = (status / 100) | 0
    if (s > 4) {
      // console.log( inspect(err, {colors: true}) )
      console.log(
        inspect(err.original ? err.original : err, { colors: true, depth: 1 }),
      )
    }
    ctx.body = {
      error: true,
      status,
      message,
      // TODO: shouldn't send stacktrace on production environment
      stacktrace: err.stacktrace || err.stack || false,
    }
    ctx.app.emit('error', err, ctx)
  }
})

//----- DELAY (dev only)

function waitFor(time) {
  return new Promise(resolve => setTimeout(() => resolve(), time))
}

async function delay(ctx, next) {
  const variation = Math.floor(
    Math.random() * Math.floor(config.delay.variation),
  )
  const time = Math.max(
    0,
    config.delay.base + variation - config.delay.variation / 2,
  )
  log.api(`waiting start`)
  await waitFor(time)
  log.api(`waiting end: ${(time / 1000).toFixed(2)}s`)
  await next()
}

if (config.isDev && config.delay) app.use(delay)

//----- MOUNT ROUTER TO APPLICATION

/**
 * @apiDefine user User access only
 * should send the `access_token` in the `HEAD Authorization`
 *
 * Bearer eyJhbGc...TJVA95OrMr
 *
 */

/**
 * @apiDefine meta
 * @apiSuccess {object} meta meta informations about the list
 * @apiSuccess {number} meta.start starting row
 * @apiSuccess {number} meta.end ending row
 * @apiSuccess {number} meta.total total of rows
 * @apiSuccess {number} meta.limit rows per page
 * @apiSuccess {number} meta.pages total of pages
 * @apiSuccess {number} meta.offset page offset
 * @apiSuccess {number} meta.currentPage the current page number
 * @apiSuccess {boolean} meta.previousPage if there's a previous page
 * @apiSuccess {boolean} meta.nextPage if there's a next page
 */

routers.forEach(router => app.use(router.routes()))

//----- LAUNCH THE MAGIC

const server = app.listen(config.PORT, endInit)

function endInit() {
  console.log(
    `API is listening on port`,
    chalk.cyan(server.address().port),
    `on mode`,
    chalk.cyan(config.NODE_ENV),
  )
}

module.exports = app
