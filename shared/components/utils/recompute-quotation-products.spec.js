import test from 'ava'
import crio from 'crio'

import recompute from './recompute-quotation-products.js'

const defaultProduct = crio({
  description: ``,
  quantity: 0,
  price: 350,
})

const products = crio([
  defaultProduct.set( `description`, `message` ),
  defaultProduct.merge( {} ),
  defaultProduct.merge( {} ),
  defaultProduct.set( `quantity`, `1` ),
])

function resultToArray( result ) {
  return result
  .thaw()
  .map( p => {
    // don't know why crio continue to put a lot of extra info event when object is thaw
    p = JSON.parse( p.toString() )
    delete p._id
    return p
  })
}

test( `filter and add an empty line at the end`, t => {
  let result = resultToArray( recompute({
    defaultProduct: defaultProduct.merge( {} ),
    products,
  }) )
  const expected = crio([
    defaultProduct.set( `description`, `message` ),
    defaultProduct.set( `quantity`, 1 ),
    defaultProduct.merge( {} ),
  ]).thaw()

  t.deepEqual( result, expected, `return a filtered array with an empty line at the end` )
})

test( `return an empty array if nothing is passed`, t => {
  let result = recompute( {} ).thaw()
  t.deepEqual( result, [], `return a filtered array with an empty line at the end` )
})

test( `add an empty line on every situation`, t => {
  let result = recompute( {
    defaultProduct: defaultProduct.merge( {} ),
    products: []
  } )
  t.is( result.length, 1, `add an empty line on a empty products` )
  result = recompute( {
    defaultProduct: defaultProduct.merge( {} ),
    products: [ defaultProduct.set( `quantity`, 1 ), ]
  } )
  t.is( result.length, 2, `add an empty line with products` )
})

test( `add id to elements without if`, t => {
  const testProducts = [
    defaultProduct.set( `description`, `message` ).set( `_id`, `first id` ),
    defaultProduct.set( `description`, `message` ),
  ]
  let result = recompute({
    defaultProduct: defaultProduct.merge( {} ),
    products: testProducts,
  })
  .map( p => p._id )

  t.is( result.length, testProducts.length + 1, `an empty line has been added` )
  t.is( result[ 0 ], testProducts[ 0 ]._id, `first id has been kept` )
  t.not( result[ 1 ], testProducts[ 1 ]._id, `second id is different` )
  t.falsy( testProducts[ 1 ]._id, `second id was not present` )
  t.regex( result[ 1 ], /^[a-zA-Z0-9]{10}$/, `second id is now present` )
})
