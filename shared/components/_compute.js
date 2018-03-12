
export const roundToNearestQuarter = number => {
  const rounded = Math.round(number * 4) / 4
  return parseFloat(rounded.toFixed(2), 10)
}

export const productTotal = product => {
  return roundToNearestQuarter( product.quantity * product.price )
}

export const textareaRows = text => {
  const hasText = typeof text === 'string'
  return !hasText ? 1 : Math.max( 1, text.split('\n').length )
}
