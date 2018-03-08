const Sequelize = require( 'sequelize' )
const bcrypt = require( 'bcryptjs' )
const randtoken = require( 'rand-token' )

const sequelize = require( './connection' )
const h = require( './_helpers' )

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
  address: {
    type:         Sequelize.TEXT,
    allowNull:    true,
    set:          h.setNormalizedString(`address`),
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
})

//////
// INSTANCE METHODS
//////

User.prototype.comparePassword = function (password) {
  const userPassword = this.getDataValue('password')
  if (!userPassword) return Promise.resolve( false )
  return bcrypt.compare( password, this.getDataValue('password') )
}

module.exports = User
