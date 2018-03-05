import Sequelize from 'sequelize'
import bcrypt from 'bcryptjs'
import randtoken from 'rand-token'

import sequelize from './connection'
import * as h from './_helpers'

function encodePassword(password) {
  if (typeof password === `undefined`) return null
  return bcrypt.hashSync(password, 10)
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
    set:          h.setNormalizedString(`email`),
  },
  name: {
    type:         Sequelize.STRING,
    allowNull:    true,
    set:          h.setNormalizedString(`name`),
  },
  lang: {
    type:         Sequelize.CHAR(2),
    defaultValue: 'en',
    validate: {
      isIn: [['en', 'fr']],
    },
  },
  // SESSION
  password: {
    type:         Sequelize.STRING,
    set:          function ( val ) {
      this.setDataValue( `password`, encodePassword(val) )
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
  // CONFIG
  tax: {
    type:         Sequelize.FLOAT,
    defaultValue: 0,
  },
  currency: {
    type:         Sequelize.CHAR(2),
    defaultValue: `$`,
    validate: {
      isIn: [[`$`, `€`]],
    },
  },
  defaultQuantity: {
    type:         Sequelize.FLOAT,
    defaultValue: 0,
  },
  defaultPrice: {
    type:         Sequelize.FLOAT,
    defaultValue: 350,
  },
  quotationPrefix: {
    type:         Sequelize.STRING,
    defaultValue: `PR`,
  },
  quotationStartingAt: {
    type:         Sequelize.INTEGER,
    defaultValue: 400,
  },
  quotationCount: {
    type:         Sequelize.BIGINT,
    defaultValue: 0,
  },
  invoicePrefix: {
    type:         Sequelize.STRING,
    defaultValue: `FA`,
  },
  invoiceStartingAt: {
    type:         Sequelize.INTEGER,
    defaultValue: 800,
  },
  invoiceCount: {
    type:         Sequelize.BIGINT,
    defaultValue: 0,
  },
})

//////
// INSTANCE METHODS
//////

User.prototype.comparePassword = function (password) {
  const userPassword = this.getDataValue('password')
  if (!userPassword) return Promise.resolve( false )
  return bcrypt.compare( password, this.getDataValue('password') )
}

export default User
