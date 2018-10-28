import { EventEmitter } from 'events'

// since we transferring koa.request.body to koa.req.body
// we need to extend types
declare module 'koa' {
  interface IncomingMessage {
    body?: {} | null | undefined
  }
}
