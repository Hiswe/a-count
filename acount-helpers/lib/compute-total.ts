import { Quotation, Product } from '@acount/types'

export function roundToNearestQuarter(number: number): number {
  const rounded = Math.round(number * 4) / 4
  return parseFloat(rounded.toFixed(2))
}

export function enforceNumber(number: any): number {
  number = typeof number !== `number` ? parseFloat(number) : number
  return isNaN(number) ? 0 : number
}

interface CleanProduct {
  quantity?: number
  price?: number
}

interface Totals {
  totalNet: number
  totalTax: number
  total: number
}

export function productTotal(product: Product): number {
  if (!product.checked) return 0
  // don't mutate product
  const cleanedProduct: CleanProduct = {}
  ;[`quantity`, `price`].forEach(key => {
    cleanedProduct[key] = enforceNumber(product[key])
  })
  const { quantity, price } = cleanedProduct
  return roundToNearestQuarter(quantity * price)
}

export function totals(document: Quotation): Totals {
  const { products, tax = 0 } = document
  if (!Array.isArray(products)) return document
  const taxRate = enforceNumber(tax)
  const totalNet = products.reduce(
    (acc, product) => acc + productTotal(product),
    0,
  )
  const totalTax = roundToNearestQuarter((totalNet * taxRate) / 100)
  const total = totalNet + totalTax
  return {
    totalNet,
    totalTax,
    total,
  }
}
