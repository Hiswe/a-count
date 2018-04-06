'use strict'

const Sequelize = require( 'sequelize' )

const sequelize      = require( './connection'              )
const dbGetterSetter = require( '../utils/db-getter-setter' )
const filterArray    = require( '../utils/filter-array-with-object' )
const compute        = require( '../utils/compute-products' )

const Product = sequelize.define( `product`, {
  id: {
    type:         Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:   true,
  },
  description: {
    type:         Sequelize.TEXT,
    allowNull:    false,
    set:          dbGetterSetter.setTrimmedString( `description` ),
  },
  quantity: {
    type:         Sequelize.FLOAT,
    allowNull:    false,
  },
  price: {
    type:         Sequelize.FLOAT,
    allowNull:    false,
  },
})

//----- MODEL METHODS

function getDefaultProduct( productConfig ) {
  const { description, quantity, price } = productConfig
  return { description, quantity, price }
}

Product.cleanProducts = function cleanProducts( params ) {
  const { quotation, user, products = [] } = params
  const defaultProduct  = getDefaultProduct( user.productConfig )
  const quotationId     = quotation.id
  const { tax }         = quotation
  if ( !products.length ) return {
    filtered: [],
    totals:   compute.totals( [], tax ),
  }
  const filtered = filterArray({
    array         : products ,
    defaultObject : defaultProduct,
  }).map( product => {
    if ( !product.quotationId ) product.quotationId = quotation.id
    return product
  })

  return {
    filtered,
    totals:   compute.totals( filtered, tax )
  }
}

Product.bulkCreateFor = async function( params ) {
  const { quotation, user, products = [] } = params
  const defaultProduct  = getDefaultProduct( user.productConfig )
  const quotationId     = quotation.id
  const { tax }         = quotation
  if ( !products.length ) return compute.totals( [], tax )

  const filtered = filterArray({
    array         : products ,
    defaultObject : defaultProduct,
  }).map( product => {
    product.quotationId = quotation.id
    return product
  })
  const savedProducts = await this.bulkCreate( filtered )
  console.log( savedProducts )
  return compute.totals( savedProducts, tax )
}

Product.bulkUpsertFor = async function( params ) {
  const { quotation, defaultProduct, products = [] } = params
  if ( !products.length ) return {total: 0}
  const productsToCreate = products.filter( product => !product.id )
  console.log( productsToCreate )
  return {total: 0}
  // const currentProducts = await this.findAll({ where: {quotationId}})
  // this.bulkCreate( products )

}

module.exports = Product
