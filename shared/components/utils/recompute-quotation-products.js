import shortid from 'shortid'
import merge from 'lodash.merge'
import crio from 'crio'

import filterArrayWithObject from './filter-array-with-object.js'

// prepare products to be consumed by quotation form
// • remove duplicated default products
// • add an empty line at the end
// • generate ids for react “key” attribute
export default function recomputeQuotationProducts( data ) {
  let { defaultProduct = false, products = [] } = data
  if ( !defaultProduct ) return crio( [] )

  defaultProduct = crio( defaultProduct )
  products = crio( products )

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
