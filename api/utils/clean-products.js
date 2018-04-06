'use strict'

const compute     = require( './compute-products'         )
const filterArray = require( './filter-array-with-object' )

function getDefaultProduct( productConfig ) {
  const { description, quantity, price } = productConfig
  return { description, quantity, price }
}

function cleanProducts( params ) {
  const { productConfig, tax, products = [] } = params
  const defaultProduct  = getDefaultProduct( productConfig )
  const filtered = filterArray({
    array         : products ,
    defaultObject : defaultProduct,
  })

  return {
    filtered,
    totals:   compute.totals( filtered, tax )
  }
}

module.exports = cleanProducts
