import chalk from 'chalk'
import merge from 'lodash.merge'
import Koa from 'koa'
import bodyParser from 'koa-body'
import compress from 'koa-compress'
import morgan from 'koa-morgan'
import json from 'koa-json'
import Router from 'koa-router'
import session from 'koa-session'
import cors from '@koa/cors'

import './db'
import redis from './redis'
import config from './config'
import router from './router'

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

//----- CORS

app.use(cors())

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

export { app as default }
