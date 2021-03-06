'use strict'

const { debuglog }  = require( 'util' )
const merge         = require( 'lodash.merge' )
const chalk         = require( 'chalk' )
const nodemailer    = require( 'nodemailer' )
const wellknown     = require( 'nodemailer-wellknown' )

const config  = require( './config' )

const log     = debuglog( `api:mailing` )

//----- MAILING CONNECTION

const { transport, provider } = config.email
const usedTransport = provider ? provider : transport
const transporter = nodemailer.createTransport( usedTransport )

transporter
  .verify()
  .then(() => { log(chalk.green(`transport creation – SUCCESS`)) })
  .catch( err => {
    log( chalk.red(`transport creation – ERROR`) )
    log( `original config` )
    log( config.email )
    log( `used transport` )
    log( usedTransport )
  })

//----- SEND METHOD

async function send( options ) {
  const mailOptions = merge( {}, config.email.options,  options )
  try {
    const info = await transporter.sendMail( mailOptions )
    log( chalk.green(`email send to`, info.accepted) )
    return info
  } catch (err) {
    const isConnectionRefused = err.code === `ECONNREFUSED`
    const message = isConnectionRefused ? `smtp connection failed`
      : `email error`
    log( chalk.red(message) )
    throw err
  }
}

module.exports = {
  transporter,
  send,
  status: transporter.verify,
}
