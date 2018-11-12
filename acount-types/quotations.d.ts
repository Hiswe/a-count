import { CustomerLight } from './customers'
import { QuotationConfig } from './quotations'
import { Product, ProductConfig } from './products'
import { ListMeta } from './list'

export interface QuotationConfig {
  creationCount: number
  prefix: string
  mentions: string
  tax: number
}

export interface Quotation {
  id: string
  reference: string
  count: number
  name: string
  mentions: string
  tax: number
  products: Product[]
  totalNet: number
  totalTax: number
  total: number
  // sendAt:
  // validatedAt:
  // signedAt:
  // archivedAt:
  userId: string
  customerId: string
  productConfigId: string
  quotationConfigId: string
  invoiceId: string
  quotationConfig: QuotationConfig
  productConfig: ProductConfig
  customer: CustomerLight
}

export interface GetAllQuotations {
  rows: Quotation[]
  meta: ListMeta
}
