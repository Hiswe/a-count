import shortid from 'shortid'
import merge from 'lodash.merge'
import crio from 'crio'

import filterArrayWithObject from './filter-array-with-object'

// prepare products to be consumed by quotation form
// • remove duplicated default products
// • add an empty line at the end
// • generate ids for react “key” attribute
export default function recomputeQuotationProducts( data ) {
  const { defaultProduct = false, products = crio([]) } = data
  const filtered = filterArrayWithObject({
    defaultObject:  defaultProduct,
    array:          products,
  })
  if ( !defaultProduct ) return filtered
  const withDefaultProducts = filtered.push( defaultProduct.merge(null) )
  const withId = withDefaultProducts.map( product => {
    if ( !product.get(`_id`) ) return product.set( `_id`, shortid() )
    return product
  })
  return withId
}
