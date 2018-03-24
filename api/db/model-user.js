'use strict'

const Sequelize = require( 'sequelize' )
const bcrypt = require( 'bcryptjs' )
const randtoken = require( 'rand-token' )
const merge = require( 'lodash.merge' )
const moment = require( 'moment' )
const urlJoin = require( 'url-join' )

const config = require( '../config' )
const mailing = require( '../mailing' )
const sequelize = require( './connection' )
const DefaultQuotation = require( './model-default-quotation' )
const DefaultInvoice = require( './model-default-invoice' )
const DefaultProduct = require( './model-default-product' )
const h = require( './_helpers' )

function encodePassword(password) {
  if (typeof password === `undefined`) return null
  return bcrypt.hashSync(password, 10)
}

function createJwtVersion() {
  return encodePassword( randtoken.generate(16) )
}

//////
// MODEL DEFINITION
//////

const User = sequelize.define( `user`, {
  id:  {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  email: {
    type:         Sequelize.STRING,
    allowNull:    false,
    unique:       true,
    validate: {   isEmail: true },
    set:          h.setNormalizedString( `email` ),
  },
  jwtVersion: {
    type:         Sequelize.STRING,
    allowNull:    false,
    unique:       true,
    set:          function( val ) {
      this.setDataValue( `jwtVersion`, createSecret() )
    },
  },
  name: {
    type:         Sequelize.STRING,
    allowNull:    true,
    set:          h.setTrimmedString( `name` ),
  },
  address: {
    type:         Sequelize.TEXT,
    allowNull:    true,
    set:          h.setTrimmedString( `address` ),
  },
  lang: {
    type:         Sequelize.CHAR(2),
    defaultValue: 'en',
    validate: {
      isIn: [['en', 'fr']],
    },
  },
  // SESSION
  quotationCount: {
    type:         Sequelize.BIGINT,
    defaultValue: 0,
    allowNull:    false,
  },
  invoiceCount: {
    type:         Sequelize.BIGINT,
    defaultValue: 0,
    allowNull:    false,
  },
  // SESSION
  password: {
    type:         Sequelize.STRING,
    set:          function ( val ) {
      this.setDataValue( `password`, encodePassword(val) )
      this.setDataValue( `jwtVersion`, createJwtVersion() )
      this.setDataValue( `token`, null )
      this.setDataValue( `tokenExpire`, null )
    },
  },
  token: {
    type:         Sequelize.STRING,
  },
  tokenExpire: {
    type:         Sequelize.DATE,
  },
  isDeactivated: {
    type:         Sequelize.BOOLEAN,
  },
})

//////
// INSTANCE METHODS
//////

User.prototype.comparePassword = function ( password ) {
  const userPassword = this.getDataValue('password')
  if (!userPassword) return Promise.resolve( false )
  return bcrypt.compare( password, this.getDataValue('password') )
}

User.prototype.resetPassword = async function ( redirectUrl ) {
  if ( !redirectUrl ) {
    throw new Error( `[USER] account – redirectUrl param is required`)
  }
  const token       = randtoken.generate( 30 )
  redirectUrl       = urlJoin( redirectUrl, `?token=${ token }` )
  this.setDataValue( `token`,       token )
  this.setDataValue( `tokenExpire`, moment().add(1, 'day') )
  const user        = await this.save()
  const content = `click here to reset your password:

${ redirectUrl }
`
  const mailOptions = {
    to:       user.email,
    subject:  `${ config.NAME } – reset password`,
    text:     content,
    html:     content.replace('\n', `<br />`),
  }
  const mailStatus  = await mailing.send( mailOptions )
  return user
}

User.prototype.setPassword = async function ( password ) {
  this.set( `password`, password )
  const user = await this.save()
  return user
}

//////
// MODEL METHODS
//////

User.findOneWithRelations = async additionalParams => {
  const params = merge({
    where: {
      isDeactivated:  { $not: true },
    },
    attributes: {
      exclude: [`token`, `tokenExpire`, `createdAt`, `updatedAt`],
    },
    include: [
      DefaultQuotation,
      DefaultInvoice,
      DefaultProduct,
    ]
  }, additionalParams )
  const user = await User.findOne( params )
  return user
}

module.exports = User
