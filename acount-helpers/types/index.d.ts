import { Quotation, ProductConfig, Product } from '@acount/types'

export interface Step {
  key: string
  label: string
  value?: any
}
export type Steps = Step[]
export interface DisplayProduct extends Product {
  total?: number
  isEmptyLine?: boolean
  path?: string
}
export interface DisplayQuotation extends Quotation {
  steps: Steps
  products: DisplayProduct[]
}
