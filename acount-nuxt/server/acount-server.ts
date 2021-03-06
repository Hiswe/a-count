import util from 'util'
import Boom from 'boom'
import consola from 'consola'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import * as nuxt from 'nuxt'
import koaNuxt from '@hiswe/koa-nuxt'

import serverConfig from './configuration'
import nuxtConfig from '../nuxt.config.js'

const { Nuxt, Builder } = nuxt
const app = new Koa()
const HOST = serverConfig.HOST
const PORT = serverConfig.PORT
const appLogger = consola.withScope(`app`)
const errorLogger = consola.withScope(`error`)

nuxtConfig.dev = serverConfig.isDev

start()

async function start() {
  //----- INITIALIZE NUXT MIDDLEWARE

  const nuxt = new Nuxt(nuxtConfig)
  const renderNuxt = koaNuxt(nuxt)

  // Build in development
  if (nuxtConfig.dev) {
    appLogger.warn(`SPA build for dev`)
    const builder = new Builder(nuxt)
    await builder.build()
  }

  //----- SERVER MIDDLEWARE

  app.use(async function isJson(ctx, next) {
    ctx.state.isJson = ctx.is(`application/json`) !== null
    await next()
  })

  app.use(async function handleKoaErrors(ctx, next) {
    try {
      await next()
    } catch (error) {
      errorLogger.error(`one of the next middleware has errored`)
      console.log(util.inspect(error, { colors: true }))
      const boomError = Boom.boomify(error, {
        statusCode: 500,
        message: `something really bad happened`,
        override: false,
      })
      ctx.status = boomError.output.statusCode
      // handle XHR
      if (ctx.state.isJson) return (ctx.body = boomError)
      // we want to make sure that ANY errors will be catch here
      ctx.body = error
    }
  })

  // This is needed for handling POST informations in No-JS environment
  app.use(bodyParser())

  // prepare ctx.req for Nuxt consumption
  app.use(async function transferKoaBodyToNodeRequest(ctx, next) {
    ctx.req.body = ctx.request.body
    ctx.req.serverConfig = serverConfig
    await next()
  })

  //----- NUXT HANDLING

  app.use(renderNuxt)

  //////
  // LAUNCHING
  //////

  app.listen(PORT, HOST, function koaInitEnd() {
    appLogger.start(
      `server is listening at ${HOST}:${PORT}`,
      `on mode ${app.env}`,
    )
  })
}
