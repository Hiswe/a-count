import shortid from 'shortid'
import merge from 'lodash.merge'

import filterArrayWithObject from './_filter-array-with-object.js'

// prepare products to be consumed by quotation form
// • remove duplicated default products
// • add an empty line at the end
// • generate ids for react “key” attribute
export default function recomputeQuotationProducts({defaultProduct, products}) {
  const filtered = filterArrayWithObject({
    defaultObject:  defaultProduct,
    array:          products,
  })
  const withDefaultProducts = filtered.push( merge({}, defaultProduct) )
  const withId = withDefaultProducts.map( product => {
    if ( !product.get(`_id`) ) return product.set( `_id`, shortid() )
    return product
  })
  return withId
}
