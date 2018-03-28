export function roundToNearestQuarter( number ) {
  const rounded = Math.round( number * 4 ) / 4
  return parseFloat( rounded.toFixed(2), 10 )
}

export function enforceNumber( number ) {
  number = typeof number !== `number` ? parseFloat( number, 10 ) : number
  return isNaN( number ) ? 0 : number
}

export function productTotal( product ) {
  // don't mutate product
  const cleanedProduct = {}
  ;[`quantity`, `price`].forEach( key => {
    cleanedProduct[ key ] = enforceNumber( product[ key ] )
  })
  const { quantity, price } = cleanedProduct
  return roundToNearestQuarter( quantity * price )
}

export function totals( products, taxRate = 0 ) {
  taxRate = enforceNumber( taxRate )
  const net = products
    .reduce( (acc, product) => acc + productTotal( product ), 0 )
  const tax = roundToNearestQuarter( net * taxRate / 100 )
  const all = net + tax
  return {
    net,
    tax,
    all,
  }
}
