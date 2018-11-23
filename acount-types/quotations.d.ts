import { CustomerLight } from './customers'
import { QuotationConfig } from './quotations'
import { Product, ProductConfig } from './products'
import { ListMeta } from './list'

export interface QuotationConfig {
  creationCount: number
  prefix: string
  mentions: string
  tax: number
  startAt: number
}

export interface Quotation {
  id: string
  reference: string

  name: string
  mentions: string
  tax: number
  products: Product[]
  totalNet: number
  totalTax: number
  total: number
  userId: string
  customerId: string
  productConfigId: string
  quotationConfigId: string
  invoiceId: string
  quotationConfig: QuotationConfig
  productConfig: ProductConfig
  customer: CustomerLight
  // sequelize dates
  createdAt: string
  updatedAt: string
  // status dates
  sendAt: string
  validatedAt: string
  signedAt: string
  archivedAt: string
  // sequelize computed
  _hasInvoice: boolean
  _canBeArchived: boolean
  _canCreateInvoice: boolean
  // used to compute reference
  index: number
  // TODO: what is count?
  // count: number
}

export interface GetAllQuotations {
  rows: Quotation[]
  meta: ListMeta
}
