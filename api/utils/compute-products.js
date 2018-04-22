'use strict'

// this is a duplicated of server/shared/components/_compute.js
// • but the API should function by itself :D

const roundToNearestQuarter = number => {
  const rounded = Math.round(number * 4) / 4
  return parseFloat(rounded.toFixed(2), 10)
}

const productTotal = product => {
  return roundToNearestQuarter( product.quantity * product.price )
}

const totals = ( products = [], taxRate = 0 ) => {
  const totalNet = products
    .reduce( (acc, product) => acc + productTotal( product ), 0 )
  const totalTax = roundToNearestQuarter( totalNet * taxRate / 100 )
  const total = totalNet + totalTax
  return {
    totalNet,
    totalTax,
    total,
  }
}

module.exports = {
  roundToNearestQuarter,
  productTotal,
  totals,
}
