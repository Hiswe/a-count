import chalk from 'chalk'
import Koa from 'koa'
import bodyParser from 'koa-body'
import compress from 'koa-compress'
import morgan from 'koa-morgan'
import json from 'koa-json'
import Router from 'koa-router'
import session from 'koa-session'
import cors from '@koa/cors'

import './db'
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

//----- SESSIONS

app.keys = [`api-concompte`]
const sessionConfig = {
  renew: true,
}
app.use( session(sessionConfig, app) )

//----- CORS

app.use(cors())

//----- MOUNT ROUTER TO APPLICATION

app.use( router.routes() )

export { app as default }
