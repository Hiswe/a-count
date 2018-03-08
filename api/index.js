'use strict'

const chalk = require( 'chalk' )
const merge = require( 'lodash.merge' )
const Koa = require( 'koa' )
const bodyParser = require( 'koa-body' )
const compress = require( 'koa-compress' )
const json = require( 'koa-json' )
const Router = require( 'koa-router' )
const session = require( 'koa-session' )
const cors = require( '@koa/cors' )

require( './db' )
const redis = require( './redis' )
const config = require( './config' )
const router = require( './router' )

//////
// SERVER CONFIG
//////

const app = new Koa()

app.use( bodyParser() )
app.use( compress() )

// format json https://github.com/koajs/json
app.use( json() )

//----- LOGGING

// to have better logs: don't use the same logger as server
const colorCodes = {
  7: 'magenta',
  5: 'red',
  4: 'yellow',
  3: 'cyan',
  2: 'green',
  1: 'green',
  0: 'yellow'
}
const time = start => {
  const delta = Date.now() - start
  return delta < 10000
    ? delta + 'ms'
    : Math.round(delta / 1000) + 's'
}
app.use( async (ctx, next) => {
  const { method, path } = ctx.request
  const start = Date.now()
  const logPath = chalk.grey(`api: ${path}`)
  const logMethod = method.toUpperCase()
  console.log( chalk.grey(`  ==>`), logMethod, logPath  )
  await next()
  const { status } = ctx.response
  const s = status / 100 | 0
  const color = colorCodes.hasOwnProperty(s) ? colorCodes[s] : 0
  console.log( chalk.grey(`  <==`), logMethod, logPath, chalk[color](status), time(start) )
})

//----- CORS

app.use( cors({
  credentials: true,
}) )

//----- SESSIONS

// • We don't use JWT: no easy session invalidation
//   http://cryto.net/%7Ejoepie91/blog/2016/06/19/stop-using-jwt-for-sessions-part-2-why-your-solution-doesnt-work/
// • session won't work at the router level: needs to put it with app

app.keys = [`api-concompte`]

const sessionsConfig = merge( {}, config.session, {
  store: {
    get: async (key, maxAge, { rolling }) => {
      let result = await redis.get( key )
      try {
        result = JSON.parse( result )
      } catch (e) {
        result = {}
      }
      return result
    },
    set: async (key, sess, maxAge, { rolling, changed }) => {
      const result = await redis.set( key, JSON.stringify(sess) )
      return result
    },
    destroy: async (key) => {
      const result = await redis.del( key )
      return result
    }
  }
})

app.use( session(sessionsConfig, app) )

//----- MOUNT ROUTER TO APPLICATION

app.use( router.routes() )

//----- LAUNCH THE MAGIC

const server = app.listen(config.PORT, function endInit() {
  console.log( `API is listening on port`, server.address().port )
})

module.exports = app
