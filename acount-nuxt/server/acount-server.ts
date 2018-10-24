import util from 'util'
import Boom from 'boom'
import consola from 'consola'
import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()
const HOST: string = process.env.HOST || `0.0.0.0`
const PORT: number = +process.env.PORT || 3000
const appLogger = consola.withScope(`app`)
const errorLogger = consola.withScope(`error`)

start()

async function start() {
  //----- XHR GUESSING

  app.use(async (ctx, next) => {
    ctx.state.isJson = ctx.is('application/json') !== null
    await next()
  })

  //----- ERROR HANDLING

  app.use(async (ctx, next) => {
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

  //----- API

  const router = new Router()

  router.get(`/`, async ctx => {
    ctx.body = `hello world`
    // const id = shortid.generate()
    // const notification = {
    //   id,
    //   message: `my flash message ${id}`,
    //   type: `info`,
    // }
    // // handle XHR
    // if (ctx.state.isJson) return (ctx.body = notification)
    // // set the flash messages
    // ctx.session = { notification }
    // // persist session with `manuallyCommit`
    // // • https://github.com/koajs/session#sessionmanuallycommit
    // await ctx.session.manuallyCommit()
    // ctx.redirect(`/test`)
  })

  //----- MOUNT ROUTER TO APPLICATION

  app.use(router.routes())
  app.use(router.allowedMethods())

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
