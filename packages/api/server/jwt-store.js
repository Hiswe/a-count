'use strict'

const bcrypt       = require( 'bcryptjs'     )
const randtoken    = require( 'rand-token'   )
const jsonwebtoken = require( 'jsonwebtoken' )
const ms           = require( 'ms'           )
const { debuglog } = require( 'util'  )

const log       = require( './utils/log' )
const jwtConfig = require( './config' ).jwt
const redis     = require( './redis'  )
const expiresInMilliseconds = ms( jwtConfig.expiresIn )

log.auth(`expires`, jwtConfig.expiresIn, expiresInMilliseconds )

const PREFIX = `JWT`

//----- UTILS

function createJwtId() {
  return bcrypt.hashSync( randtoken.generate(16), 10 )
}

function createJWT( user ) {
  const { secret, expiresIn } = jwtConfig
  const data       = {
    userId: user.id,
    jwtId:  createJwtId(),
  }
  return {
    accessToken: jsonwebtoken.sign( data, secret, {expiresIn} ),
    data,
  }
}

function getFullJwtKey( jwtData ) {
  const { userId, jwtId } = jwtData
  return `${ PREFIX }:${ userId }::${ jwtId }`
}

function getSearchByUserId( userId ) {
  return `${ PREFIX }:${ userId }::*`
}

//----- LIB

// we handle a whitelist of JWT in redis
// • it's not important to persist it
// • thanks to redis we can expire the entry in the same time as the JWT

// create a JWT
// • store it in redis
async function add( user ) {
  const jwt      = createJWT( user )
  const userId   = user.id
  const redisKey = getFullJwtKey( jwt.data )
  log.auth( `add user – `, redisKey )
  await redis.set( redisKey, userId, `PX`, expiresInMilliseconds )
  return jwt.accessToken
}

async function check( jwtData ) {
  const userId = await redis.get( getFullJwtKey(jwtData) )
  return userId
}

// This allow us to “blacklist” a JWT before expiring date
async function remove( jwtData ) {
  await redis.del( getFullJwtKey(jwtData) )
}

// blacklist all JWT from a user
// • used when reset password
// • can be used if we want to logout from all platforms
async function removeAllFromUser( userId ) {
  const keys = await redis.find( getSearchByUserId(userId) )
  await redis.del( keys )
  return keys
}

module.exports = {
  add,
  check,
  remove,
  removeAllFromUser,
}
