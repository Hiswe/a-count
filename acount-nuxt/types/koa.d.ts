import { EventEmitter } from 'events'
import { ServerConfiguration } from './acount'

// since we transferring koa.request.body to koa.req.body
// we need to extend types
declare module 'koa' {
  interface IncomingMessage {
    body?: {} | null | undefined
    serverConfig: ServerConfiguration
  }
}
