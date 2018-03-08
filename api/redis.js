'use strict'

const { promisify, debuglog } = require( 'util' )
const redis = require( 'redis' )

const config = require( './config' )

const log = debuglog( `redis` )
const client = redis.createClient( config.redis.port, config.redis.host )

client.on( `ready`, () => log(`ready`) )
client.on( `connect`, () => log(`connect`) )
client.on( `reconnecting`, () => log(`reconnecting`) )
client.on( `error`, err => {
  log(`error`)
  log( err )
})
client.on( `ready`, () => log(`ready`) )
client.monitor( (err, res) => {
    log(`Entering monitoring mode.`);
})
client.on(`monitor`, (time, args, raw_reply) => {
  log(time + ": " + args) // 1458910076.446514:['set', 'foo', 'bar']
})

const get = promisify( client.get ).bind( client )
const set = promisify( client.set ).bind( client )
const del = promisify( client.del ).bind( client )

module.exports = {
  get,
  set,
  del,
}
