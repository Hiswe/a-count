
export const roundToNearestQuarter = number => {
  const rounded = Math.round(number * 4) / 4
  return parseFloat(rounded.toFixed(2), 10)
}

export const productTotal = product => {
  return roundToNearestQuarter( product.quantity * product.price )
}

export const totals = ( products, taxRate = 0 ) => {
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

export const textareaRows = text => {
  const hasText = typeof text === 'string'
  return !hasText ? 1 : Math.max( 1, text.split('\n').length )
}
