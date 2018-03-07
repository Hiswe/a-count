const chalk = require( 'chalk' )
const merge = require( 'lodash.merge' )
const Koa = require( 'koa' )
const bodyParser = require( 'koa-body' )
const compress = require( 'koa-compress' )
const morgan = require( 'koa-morgan' )
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
app.use( morgan(`dev`) )
// app.use( async (ctx, next) => {
//   console.log( ctx.cookies )
//   await next()
// })

//----- CORS

app.use( cors() )

//----- SESSIONS

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

// We don't use JWT
// http://cryto.net/%7Ejoepie91/blog/2016/06/19/stop-using-jwt-for-sessions-part-2-why-your-solution-doesnt-work/
// session won't work at the router level
app.use( session(sessionsConfig, app) )

//----- MOUNT ROUTER TO APPLICATION

app.use( router.routes() )

//----- LAUNCH THE MAGIC

const server = app.listen(config.PORT, function endInit() {
  console.log( `API is listening on port`, server.address().port )
})

module.exports = app
