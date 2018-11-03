import { QuotationConfig } from './acount-quotations'
import { InvoiceConfig } from './acount-invoices'
import { ProductConfig } from './acount-products'

export interface AcountUser {
  id: string
  email: string
  name: string
  address: string
  lang: `en` | `fr`
  currency: `USD` | `EUR` | `THB`
  quotationConfig: QuotationConfig
  invoiceConfig: InvoiceConfig
  productConfig: ProductConfig
}

export interface LoginResponse {
  user: AcountUser
  access_token: string
}
