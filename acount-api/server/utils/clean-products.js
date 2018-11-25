'use strict'

const compute = require('./compute-products')
const filterArray = require('./filter-array-with-object')

module.exports = cleanProducts

function getDefaultProduct(productConfig) {
  const { description, quantity, price } = productConfig
  return { description, quantity, price }
}

function cleanProducts(params) {
  const { productConfig, tax, products = [] } = params
  const defaultProduct = getDefaultProduct(productConfig)
  const filtered = filterArray({
    array: products,
    defaultObject: defaultProduct,
  }).map(product => {
    // handle checkbox result
    // might be boolean or string (no-JS environment)
    product.checked = `${product.checked}` === `true`
    return product
  })

  return {
    filtered,
    totals: compute.totals(filtered, tax),
  }
}
