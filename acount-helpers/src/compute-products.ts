import flow from 'lodash.flow'
import isObject from 'lodash.isobject'
import cloneDeep from 'lodash.clonedeep'
import merge from 'lodash.merge'
import shortid from 'shortid'
import { Quotation, ProductConfig, Product } from '@acount/types'

import { Steps, DisplayQuotation, DisplayProduct } from '../types'
import { filterArrayWithObject } from './filter-array-with-object'
import * as compute from './compute-total'

const EMPTY_PRODUCT_ID = shortid()

export function computeDisplayProducts(
  quotation: DisplayQuotation,
): DisplayQuotation {
  const defaultProduct = quotation.productConfig
  const products = quotation.products
  if (!Array.isArray(products)) return quotation
  if (!isObject(defaultProduct)) return quotation
  const cleanedProducts = filterArrayWithObject<ProductConfig, DisplayProduct>({
    defaultObject: defaultProduct,
    array: products,
  })
  quotation.products = cleanedProducts.map((product: DisplayProduct, index) => {
    return setFormPath(computeDisplayProduct(product), index)
  })
  // • add an empty line a the end…
  //   …in case a user just type something on the blank one
  const emptyProduct = merge({}, defaultProduct, {
    _id: EMPTY_PRODUCT_ID,
    checked: true,
    description: ``,
    isEmptyLine: true,
    total: compute.productTotal(defaultProduct),
  })
  quotation.products.push(emptyProduct)
  return quotation
}

function addEmptyLineInformation(product: DisplayProduct): DisplayProduct {
  product.isEmptyLine = false
  return product
}
function ensureId(product: DisplayProduct): DisplayProduct {
  if (!product._id) product._id = shortid()
  return product
}
function addTotal(product: DisplayProduct): DisplayProduct {
  product.total = compute.productTotal(product)
  return product
}
const computeDisplayProduct = flow(
  addEmptyLineInformation,
  ensureId,
  addTotal,
)
function setFormPath(product: DisplayProduct, index: number): DisplayProduct {
  product.path = `products[${index}]`
  return product
}
