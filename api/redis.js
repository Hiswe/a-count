'use strict'

const { promisify, debuglog } = require( 'util'  )
const   chalk                 = require( 'chalk' )
const   redis                 = require( 'redis' )

const config = require( './config' )

const log = debuglog( `api:redis` )
log( chalk.green(`init logging`) )

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
  log( `Entering monitoring mode.` )
})
client.on( `monitor`, (time, args, raw_reply) => {
  log(`${ time }: ${ args.join( ' ' ) }`) // 1458910076.446514:['set', 'foo', 'bar']
})

const get   = promisify( client.get ).bind( client )
const set   = promisify( client.set ).bind( client )
const del   = promisify( client.del ).bind( client )
const scan  = promisify( client.scan ).bind( client )

// make a search
// https://redis.io/commands/scan#scan-basic-usage
async function find( query ) {
  const [ startingCount, firstResult ] = await scan( 0, `MATCH`, query )
  let count = parseInt( startingCount, 10 )
  let result = firstResult
  while ( count !== 0 ) {
    const [ currentCount, currentResult ] = await scan( count, `MATCH`, query )
    count = parseInt( currentCount, 10 )
    result = result.concat( currentResult )
  }
  // Redis doesn't guarantee that result have no duplicate
  // • just make sure there aren't any in the response
  return [...new Set( result )]
}

module.exports = {
  get,
  set,
  del,
  find,
}
