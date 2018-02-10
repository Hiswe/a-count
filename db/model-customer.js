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

export {
  Customer as default,
}
