'use strict'

import Sequelize from 'sequelize'

import sequelize from './db-connection'
import * as h from './helpers'

const Customer = sequelize.define( `customer`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  name: {
    type:         Sequelize.STRING,
    allowNull:    false,
    validate:     {
      notEmpty: true,
    },
    unique:       true,
    set:          function ( val ) {
      this.setDataValue( `name`, h.normalizeString( val ) )
    }
  },
  address: {
    type:         Sequelize.TEXT,
    set:          function ( val ) {
      this.setDataValue( `address`, `${val}`.trim() )
    }
  },
  isDeactivated: {
    type:         Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

// Don't use upsert as it didn't return an instance but only a status
// http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-upsert
Customer.updateOrCreate = async function( id, params ) {
  // https://medium.com/@griffinmichl/async-await-with-ternary-operators-af19f374215
  const user = await ( id ? this.findById(id) : new Customer() )
  if ( !user ) return null
  return user.update( params )
}

export {
  Customer as default,
}
