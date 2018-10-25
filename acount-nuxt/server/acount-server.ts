import util from 'util'
import Boom from 'boom'
import consola from 'consola'
import Koa from 'koa'
import Router from 'koa-router'
import * as nuxt from 'nuxt'
import koaNuxt from '@hiswe/koa-nuxt'

import nuxtConfig from '../nuxt.config.js'
import apiBackupRoutes from './routing-api-backup'

const { Nuxt, Builder } = nuxt
const app = new Koa()
const HOST: string = process.env.HOST || `0.0.0.0`
const PORT: number = Number(process.env.PORT) || 3000
const appLogger = consola.withScope(`app`)
const errorLogger = consola.withScope(`error`)

nuxtConfig.dev = !(app.env === `production`)

start()

async function start() {
  //----- INITIALIZE NUXT MIDDLEWARE

  // Instantiate nuxt.js
  const nuxt = new Nuxt(nuxtConfig)
  // create the nuxt middleWare
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
      // we want to make that ANY errors will be catch here
      ctx.body = error
    }
  })

  //////
  // API ROUTING
  //////

  const router = new Router()

  router.use(apiBackupRoutes.routes())

  app.use(router.routes())
  app.use(router.allowedMethods())

  //////
  // NUXT FALLBACK
  //////

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
